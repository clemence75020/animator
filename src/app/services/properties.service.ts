import { Subject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Property } from "../models/Properties/Property";

@Injectable({
  providedIn: "root"
})
export class PropertiesService {
  changedSubject = new Subject<Property>();
  public get changed(): Observable<Property> {
    return this.changedSubject.asObservable();
  }

  public emitPropertyChanged(property: Property) {
    this.changedSubject.next(property);
  }
}
