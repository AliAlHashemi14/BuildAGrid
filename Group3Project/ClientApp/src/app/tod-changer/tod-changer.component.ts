import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TOD } from '../tod';

@Component({
  selector: 'app-tod-changer',
  templateUrl: './tod-changer.component.html',
  styleUrls: ['./tod-changer.component.css']
})
export class TODChangerComponent implements OnInit {

  @Output() created = new EventEmitter<TOD>();
  timeSeasonRegion:TOD = {} as TOD;
  times:any[] = [
    {
      id:"Night",
      utc:"10",
      day:"same"

    },
    {
      id:"Morning",
      utc:"14",
      day:"same"
    },
    {
      id:"Midday",
      utc:"20",
      day:"same"
    },
    {
      id:"Evening",
      utc:"01",
      day:"next"
    }
  ];
  seasons:any[] = [
    {
      id:"Winter",
      day:"2021-02-28T",
      //next:"2021-03-01T"

    },
    {
      id:"Spring",
      day:"2021-04-20T",
      //next:"2021-04-21T"
    },
    {
      id:"Summer",
      day:"2021-08-28T",
      //next:"2021-08-29T"
    },
    {
      id:"Fall",
      day:"2021-10-28T",
      //next:"2021-10-29T"
    }
  ];
  regions:string[] = ["MISO", "AZPS", "CISO"];

  constructor() { }

  ngOnInit(): void {
    this.timeSeasonRegion.time = "20";
    this.timeSeasonRegion.region = "AZPS";
    this.timeSeasonRegion.season = "Winter";
  }

  UpdateTOD(form:NgForm):void{
    this.timeSeasonRegion.time = form.form.value.TOD;
    this.timeSeasonRegion.region = form.form.value.Region;
    this.timeSeasonRegion.season = form.form.value.Season;
    console.log(this.timeSeasonRegion)
    this.created.emit(this.timeSeasonRegion);
  }



}
