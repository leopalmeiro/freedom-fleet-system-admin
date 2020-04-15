import { Injectable } from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BreakpointService {

  //OBject for breakpoint
  private xsBreakpoint = ["(max-width:575.98px)"];
  private smBreakpoint = ["(min-width:576px) and (max-width:767.98px)"];
  private mdBreakpoint = ["(min-width:768px) and (max-width:991.98px)"];
  private lgBreakpoint = ["(min-width:992px) and (max-width:1199.98px)"];
  private xlBreakpoint = "(min-width:1200px)";

  private _isXSScreen: boolean = false;
  private _isSMScreen: boolean = false;
  private _isMDScreen: boolean = false;
  private _isLGScreen: boolean = false;
  private _isXLScreen: boolean = false;

  //information ofSubjects and observables
  private _isXSScreenBehavior = new BehaviorSubject<boolean>(false);
  /**
   * public propriety isMobile$
   */
  public isMobile$ = this._isXSScreenBehavior.asObservable();

  /**
   * get XSSreen
   * @returns boolean
   */
  public get isXSScreen(): boolean {
    return this._isXSScreen;
  }

  /**
   * Set value of xsScreen
   * @param boolean
   */
  public set isXSScreen(value: boolean) {
    this._isXSScreen = value;
    this._isXSScreenBehavior.next(value);
  }
  /**
   * get SMSreen
   * @returns boolean
   */
  public get isSMScreen(): boolean {
    return this._isSMScreen;
  }

  /**
   * get MDSreen
   * @returns boolean
   */
  public get isMDScreen(): boolean {
    return this._isMDScreen;
  }

  /**
   * get LGSreen
   * @returns boolean
   */
  public get isLGScreen(): boolean {
    return this._isLGScreen;
  }
  /**
   * get XLSreen
   * @returns boolean
   */
  public get isXLScreen(): boolean {
    return this._isXLScreen;
  }

  /**
   * Constructor Method
   * @param breakpointObserver
   */
  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }
  /**
   * InithObservers with observables for all type of screen
   * and populate boolean value of screen type.
   */
  private initObservers() {
    this.breakpointObserver
      .observe(this.xsBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this._isXSScreen = true : this._isXSScreen = false;
      });
    this.breakpointObserver
      .observe(this.smBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this._isSMScreen = true : this._isSMScreen = false;
      });
    this.breakpointObserver
      .observe(this.mdBreakpoint)
      .subscribe((state: BreakpointState) => {
          state.matches ? this._isMDScreen = true : this._isMDScreen = false;
      });
    this.breakpointObserver
      .observe(this.lgBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this._isLGScreen = true : this._isLGScreen = false;
      });
    this.breakpointObserver
      .observe(this.xlBreakpoint)
      .subscribe((state: BreakpointState) => {
        state.matches ? this._isXLScreen = true : this._isXLScreen = false;
      });
  }
}
