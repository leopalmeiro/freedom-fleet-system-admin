import { Injectable } from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { BehaviorSubject } from "rxjs";

export enum Breakpoints {
  "XS" = "xs",
  "SM" = "sm",
  "MD" = "md",
  "LG" = "lg",
  "XL" = "xl",
}
@Injectable({
  providedIn: "root",
})
export class BreakpointService {
  private xsBreakpoint = ["(max-width:575.98px)"];
  private smBreakpoint = ["(min-width:576px) and (max-width:767.98px)"];
  private mdBreakpoint = ["(min-width:768px) and (max-width:991.98px)"];
  private lgBreakpoint = ["(min-width:992px) and (max-width:1199.98px)"];
  private xlBreakpoint = "(min-width:1200px)";

  public isXSScreen: boolean = false;
  public isSMScreen: boolean = false;
  public isMDScreen: boolean = false;
  public isLGScreen: boolean = false;
  public isXLScreen: boolean = false;

  public screenSizeObserver = new BehaviorSubject<Breakpoints[]>([
    Breakpoints.XS,
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }

  private initObservers() {
    this.breakpointObserver
      .observe(this.xsBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this.isXSScreen = true : this.isXSScreen = false;
      });
    this.breakpointObserver
      .observe(this.smBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this.isSMScreen = true : this.isSMScreen = false;
      });
    this.breakpointObserver
      .observe(this.mdBreakpoint)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          state.matches ? this.isMDScreen = true : this.isMDScreen = false;
        }
      });
    this.breakpointObserver
      .observe(this.lgBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this.isLGScreen = true : this.isLGScreen = false;
      });
    this.breakpointObserver
      .observe(this.xlBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this.isXLScreen = true : this.isXLScreen = false;

      });
  }
}
