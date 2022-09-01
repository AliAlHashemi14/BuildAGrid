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
  regions:string[] = ["MISO", "CISO"];
  difficulty:any[] = [{num: 0.01, label:"Easy"}, {num: 0.1, label:"Medium"}, {num:1, label:"Actual Demand (Hard)"}]

  constructor() { }

  ngOnInit(): void {
    this.timeSeasonRegion.time = "20";
    this.timeSeasonRegion.region = "MISO";
    this.timeSeasonRegion.season = "Winter";
    this.timeSeasonRegion.difficulty = 0.01;
  }

  UpdateTOD(form:NgForm):void{
    this.timeSeasonRegion.time = form.form.value.TOD;
    this.timeSeasonRegion.region = form.form.value.Region;
    this.timeSeasonRegion.season = form.form.value.Season;
    this.timeSeasonRegion.difficulty = form.form.value.Difficulty
    console.log(this.timeSeasonRegion)
    this.created.emit(this.timeSeasonRegion);
  }



}
