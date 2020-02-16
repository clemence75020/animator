import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { TreeNode } from "../models/tree-node";

import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { PropertiesService } from "./properties.service";
import { Property } from "../models/Properties/Property";
import { Properties } from "../models/Properties/Properties";
import { AnimationTimelineKeyframe } from "animation-timeline-js";
import { PlayerService } from "./player.service";
import { AnimationItem } from "lottie-web";
import { SelectedData } from "../models/SelectedData";
import { Keyframe } from "../models/keyframes/Keyframe";
import { InputDocument } from "../models/input-document";
import { AppFactory } from "./app-factory";
import { ViewportService } from "./viewport/viewport.service";
import { LoggerService } from "./logger.service";
import { ToolsService } from "./viewport/tools.service";
import { OutlineService } from './outline.service';

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  constructor(
    private appFactory: AppFactory,
    private propertiesService: PropertiesService,
    private viewportService: ViewportService,
    private logger: LoggerService,
    private playerService: PlayerService,
    private toolsService: ToolsService,
    private outlineService: OutlineService
  ) {
    this.propertiesService.сhanged.subscribe(p => {
      const doc = this.documentSubject.getValue();
      this.onDocumentChanged(doc, true);
    });
  }

  documentSubject = new BehaviorSubject<InputDocument>(null);


  deleteElement(array, element) {
    const index: number = array.indexOf(element);
    if (index !== -1) {
      return array.splice(index, 1);
    }
    return array;
  }

  public get document(): Observable<InputDocument> {
    return this.documentSubject.asObservable();
  }

  public setDocument(document: InputDocument, title: string) {
    this.onDocumentChanged(document);
  }

  onDocumentChanged(document: InputDocument, refresh: boolean = false) {
    if (!this.viewportService.isInit()) {
      this.logger.log(
        `Viewport is not ready to open the document: ${document.title}.`
      );
      return;
    }

    const initializer = this.appFactory.getViewportIntializer(document);
    if (!initializer) {
      this.logger.log(
        `Cannot open document ${document.title}. Cannot find a parser for file.`
      );
      return;
    }

    if (refresh && !initializer.initOnRefresh()) {
      return;
    }

    if (!document) {
      return;
    }

    this.dispose(refresh);
    try {
      const data = initializer.intialize(
        document,
        this.viewportService.playerHost
      );

      this.viewportService.setViewportSize(data.size);
      this.playerService.setPlayer(data.player);
      if (!refresh) {
        this.outlineService.parseDocumentOutline(document);
      }

      this.toolsService.fitViewport();
      this.documentSubject.next(document);
    } catch (err) {
      const message = `Document cannot be initializer ${document.title}.`;
      this.logger.log(message);
      this.dispose();
      this.toolsService.fitViewport();
      this.documentSubject.next(null);
      // TODO: error view
      alert(message);
    }
  }

  dispose(refresh = false) {
    this.outlineService.deselectAll();
    if (!refresh) {
      this.outlineService.dispose();
      this.viewportService.dispose();
    }
    this.playerService.dispose();
  }
}
