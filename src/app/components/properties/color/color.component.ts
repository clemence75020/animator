import { Component, OnInit, Input } from "@angular/core";
import { PropertiesService } from "src/app/services/properties.service";
import { ColorProperty } from "src/app/models/Properties/ColorProperty";
import { BaseComponent } from "../../base-component";

@Component({
  selector: "app-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.scss"],
})
export class ColorComponent extends BaseComponent implements OnInit {
  constructor(private propertiesService: PropertiesService) {
    super();
  }

  ngOnInit() {}

  @Input()
  property: ColorProperty = null;

  onValueChanged(event) {
    if (this.property) {
      //this.property.setValue(parseInt(event.target.value));
      //this.propertiesService.emitPropertyChanged(this.property);
    }
  }
}
