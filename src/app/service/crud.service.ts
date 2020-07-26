import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireservice: AngularFirestore) { }

  create_Newemployee(Record)
  {
    return this.fireservice.collection('Employee').add(Record);
  }

  get_Allemployee()
  {
    return this.fireservice.collection('Employee').snapshotChanges();
  }

  update_employee(Recordid,Record)
  {
    this.fireservice.doc('Employee/'+ Recordid).update(Record);
  }

  delete_employee(record_id)
  {
    this.fireservice.doc('Employee/'+ record_id).delete();
  }

}
