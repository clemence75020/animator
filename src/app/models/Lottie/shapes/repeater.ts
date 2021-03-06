import { baseShape } from "./baseShape";
import { valueKeyframed } from "../properties/valueKeyframed";
import { composite } from "../helpers/composite";
import { transform } from "./transform";

export class repeater extends baseShape {
  /**
   * Composite of copies
   */
  m: composite;

  /**
   * Transform. Transform values for each repeater copy
   */
  tr?: transform | any;
  /**
   * Copies. Number of Copies default {"a": 0, "k": 1}
   */
  c: valueKeyframed;

  /**
   * Offset. Offset of Copies default {"a": 0, "k": 0}
   */
  o: valueKeyframed;
}
