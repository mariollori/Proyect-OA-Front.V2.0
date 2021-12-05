import { Injectable, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { Persona } from '../models/Persona';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  nombre:string=''
  constructor() { }
}
