import { Subject, Observable, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
export enum CursorType {
  Alias = "alias",
  AllAcroll = "all-scroll",
  Auto = "auto",
  Cell = "cell",
  ContextMenu = "context-menu",
  ColResize = "col-resize",
  Copy = "copy",
  Crosshair = "crosshair",
  Default = "default",
  EResize = "e-resize",
  EWResize = "ew-resize",
  Grab = "grab",
  Grabbing = "grabbing",
  Help = "help",
  Move = "move",
  NResize = "n-resize",
  NEResize = "ne-resize",
  NESWResize = "nesw-resize",
  NSResize = "ns-resize",
  NWResize = "nw-resize",
  NWSEResize = "nwse-resize",
  NoDrop = "no-drop",
  None = "none",
  NotAllowed = "not-allowed",
  Pointer = "pointer",
  Progress = "progress",
  RowResize = "row-resize",
  SResize = "s-resize",
  SEResize = "se-resize",
  SWResize = "sw-resize",
  Text = "text",
  WResize = "w-resize",
  Wait = "wait",
  ZoomIn = "zoom-in",
  ZoomOut = "zoom-out",
  RotateBL = "url('/assets/images/rotate_bl.png') 0 0, pointer",
  RotateBR = "url('/assets/images/rotate_br.png') 0 0, pointer",
  RotateTL = "url('/assets/images/rotate_tl.png') 0 0, pointer",
  RotateTR = "url('/assets/images/rotate_tr.png') 0 0, pointer",
}
@Injectable({
  providedIn: "root",
})
export class CursorService {
  cursorSubject = new BehaviorSubject<CursorType>(CursorType.Default);
  public get сhanged(): Observable<CursorType> {
    return this.cursorSubject.asObservable();
  }

  public setCursor(cursor: CursorType) {
    if (cursor !== this.cursorSubject.getValue()) {
      this.cursorSubject.next(cursor);
    }
  }
}
