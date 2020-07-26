import { Component,OnInit } from '@angular/core';
import { CrudService } from './service/crud.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'CRUD APP';

  employee: any;
  employeeName: string;
  employeeAge: number;
  employeeAdress: string;
  message:string;

  constructor(private crudservice: CrudService){}

  ngOnInit()
  {
    this.crudservice.get_Allemployee().subscribe(data => {
      this.employee = data.map(e =>{
        return{
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          Adress: e.payload.doc.data()['Adress'],
        };
      })

      console.log(this.employee);

    });
  }

  CreateRecord()
  {
    let Record= {};

    Record['name']=this.employeeName;
    Record['age']=this.employeeAge;
    Record['Adress']=this.employeeAdress;

    this.crudservice.create_Newemployee(Record).then(res => {

        this.employeeName="";
        this.employeeAge=undefined;
        this.employeeAdress="";
        this.message= "Employees data Save done";

        console.log(res);
    }).catch(error => {
        console.log(error);
    })
  }

  EditRecord(Record)
  {
    Record.isEdit= true;

    Record.editname= Record.name;
    Record.editage= Record.age;
    Record.editAdress= Record.Adress;
  }

  Updaterecord(recorddata)
  {
    let Record= {};

    Record['name']=recorddata.editname;
    Record['age']=recorddata.editage;
    Record['Adress']=recorddata.editAdress;

    this.crudservice.update_employee(recorddata.id,Record);

    recorddata.isEdit=false;
  }

  Deleteemployee(record_id)
  {
    this.crudservice.delete_employee(record_id);
  }

}

