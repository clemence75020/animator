import { PropertyType } from "./PropertyType";
import { PropertyDataType } from "./PropertyDataType";
import { Keyframe } from "../keyframes/Keyframe";
import { TreeNode } from "src/app/models/tree-node";

// Property view model.
export class Property {
  constructor(
    node: TreeNode,
    key: string,
    name: string,
    data,
    description: string
  ) {
    this.key = key;
    this.name = name;
    this.data = data;
    this.description = description;
    this.node = node;
  }

  public node: TreeNode;
  public readonly = false;
  public key: string;
  public name: string;
  public dataType: PropertyDataType = PropertyDataType.string;
  public dynamicProperty: any = null;
  public description: string;
  // Container to set the data
  public data: any;
  public icon: string;
  // Render this property as outline node:
  public renderAsOutline = false;
  public type: PropertyType = PropertyType.text;
  public keyframes: Keyframe[] = [];

  getKeyframes(): Keyframe[] {
    let keyframes: Keyframe[] = [];

    if (this.data && this.key) {
      let data = this.data[this.key];
      if (
        data &&
        (this.dataType === PropertyDataType.value ||
          this.dataType === PropertyDataType.multi)
      ) {
        if (data.k !== undefined) {
          if (data.k.length >= 0) {
            for (let i = 0; i < data.k.length; i++) {
              let frame = data.k[i];
              if (frame.t != undefined) {
                let keyframe = new Keyframe();
                keyframe.property = this;
                keyframe.key = "t";
                keyframe.container = frame;
                if (this.node) {
                  keyframe.model = this.node.model;
                }
                keyframes.push(keyframe);
              }
            }
          }
        }
      }
    }

    return keyframes;
  }

  /**
   * Displayed value.
   */
  public value: any;

  /**
   * Get interpolated value at the specific time.
   * @param frame 
   */
  getValueAtTime(frame: number) {
    if (this.dynamicProperty && this.dynamicProperty.getValueAtTime) {
      if (this.key) {
        let subproperty = this.dynamicProperty[this.key];
        if (subproperty) {
          return subproperty.getValueAtTime(frame);
        }
      } else {
        return this.dynamicProperty.getValueAtTime(frame);
      }
    }

    if (this.data && this.key) {
      return this.data[this.key];
    }
  }

  setValueAtTime(frame: number) {
    this.value = this.getValueAtTime(frame);
  }

  getValue(): any {
    if (this.data && this.key) {
      return this.data[this.key];
    }
  }

  setValue(value: any): any {
    if (this.data && this.key) {
      this.data[this.key] = value;
    }
  }
}
