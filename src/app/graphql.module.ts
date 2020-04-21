import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Apollo
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { environment } from 'src/environments/environment';
import { ErroHandlerService } from './core/services/erro-handler.service';
import { ErroHandlerMessage } from './shared/models/erro-handler-message';
import { ProgressBarService } from './core/services/progress-bar/progress-bar.service';



const uri = environment.GraphQLUri;

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ]
})
export class GraphQLModule {
  erroHandlerMessage: ErroHandlerMessage;

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private handlerService: ErroHandlerService,
    private progressBarService: ProgressBarService,


  ) {
    /**
     * method for intercept error from graphql server
     */
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
        {
          this.erroHandlerMessage = {
            codeError: null,
            error: message,
          };
          this.handlerService.addError(this.erroHandlerMessage);
          this.progressBarService.desactive();
        },
        );
        //remove validation because use in http: error interception
    /*   if (networkError) {
        this.erroHandlerMessage = {
          codeError: null,
          error: networkError.message,
        };
        this.handlerService.addError(this.erroHandlerMessage);

      } */

    });

    /**
     * Create apollo conection with erro handler
     */
    apollo.create({
      link: ApolloLink.from([errorLink, httpLink.create({ uri: uri })]) ,
      cache: new InMemoryCache({addTypename: false}),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    });
  }



}
