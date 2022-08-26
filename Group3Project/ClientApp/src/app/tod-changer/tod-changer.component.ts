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
      utc:"T10",
      day:"same"

    },
    {
      id:"Morning",
      utc:"T14",
      day:"same"
    },
    {
      id:"Midday",
      utc:"T20",
      day:"same"
    },
    {
      id:"Evening",
      utc:"T01",
      day:"next"
    }
  ];
  seasons:any[] = [
    {
      id:"Winter",
      month:"2021-02",
      day:"-28"
      //next:"2021-03-01T"

    },
    {
      id:"Spring",
      month:"2021-04",
      day:"-20",
      //next:"2021-04-21T"
    },
    {
      id:"Summer",
      month:"2021-08",
      day:"-28"
    },
    {
      id:"Fall",
      month:"2021-10",
      day:"-28"
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
