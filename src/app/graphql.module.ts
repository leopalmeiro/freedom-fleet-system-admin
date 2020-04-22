import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
// Apollo
import { Apollo, ApolloModule } from "apollo-angular";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { environment } from "src/environments/environment";
import { ErroHandlerService } from "./core/services/erro-handler.service";
import { ProgressBarService } from "./core/services/progress-bar/progress-bar.service";
import { ErroHandlerMessage } from "./shared/models/erro-handler-message";
import { HelperResponseError } from './shared/models/HelperResponseError';
import { ResponseError } from './shared/models/ResponseError';

const uri = environment.GraphQLUri;

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  erroHandlerMessage: ErroHandlerMessage;
  errors:ResponseError= new HelperResponseError();

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private handlerService: ErroHandlerService,
    private progressBarService: ProgressBarService
  ) {

    /**
     * method for intercept error from graphql server
     */
    const errorLink = onError(
      ({ graphQLErrors, networkError,}) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message }) => {
            this.erroHandlerMessage = {
              codeError: null,
              error: message,
            };
            this.errors.message = message;
            this.progressBarService.desactive();
            this.handlerService.addError(this.errors);

          });
          if (networkError) {
            this.errors.status = networkError['status'];
            this.errors.statusText = networkError['statusText'];
            this.errors.errors = networkError['error'];
            this.errors.url = networkError['url']
            this.errors.message = networkError['message'];
            this.progressBarService.desactive();
            this.handlerService.addError(this.errors);
          }
        }
    );

    /**
     * Create apollo conection with erro handler
     */
    apollo.create({
      link: ApolloLink.from([errorLink,errorLink, httpLink.create({ uri: uri })]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
      },
    });
  }
}
