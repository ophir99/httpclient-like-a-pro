import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Observable } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "httpclient-like-a-pro";
  postForm: FormGroup;
  editForm: FormGroup;
  posts = [];
  currentPostId;
  posts$: Observable<any>;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.createPostForm();
    this.createEditForm();
    this.getAll();
    this.posts$ = this.http.get("http://localhost:8900/posts/all");
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      title: [],
      desc: [],
      hashtags: this.formBuilder.array([])
    });
  }
  createEditForm() {
    this.editForm = this.formBuilder.group({
      title: [],
      desc: [],
      hashtags: this.formBuilder.array([])
    });
  }

  addHashtags() {
    (this.postForm.get("hashtags") as FormArray).push(
      this.formBuilder.control("")
    );
  }
  addHashtags_() {
    (this.editForm.get("hashtags") as FormArray).push(
      this.formBuilder.control("")
    );
  }
  getAll() {
    this.http.get("http://localhost:8900/posts/all").subscribe(
      (res: any) => {
        console.log(res);
        this.posts = res.response;
      },
      err => {
        console.log("Error", err);
      }
    );
  }
  createPost() {
    this.http
      .post("http://localhost:8900/posts/new", this.postForm.value)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error", err);
        }
      );
  }

  setDataToEditForm(obj) {
    console.log(obj);
    this.currentPostId = obj._id;
    this.createEditForm();
    const arr = obj.hashtags;
    arr.forEach(el => {
      (this.editForm.get("hashtags") as FormArray).push(
        this.formBuilder.control("")
      );
    });

    // this.editForm.patchValue(obj);
    this.editForm.setValue({
      title: obj.title,
      desc: obj.desc,
      hashtags: obj.hashtags
    });
  }

  editPost() {
    this.http
      .put(
        `http://localhost:8900/posts/update/${this.currentPostId}`,
        this.editForm.value
      )
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error", err);
        }
      );
  }

  del(id: string) {
    this.http.delete(`http://localhost:8900/posts/${id}`).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error", err);
      }
    );
  }
}
