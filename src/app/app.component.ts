import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "httpclient-like-a-pro";
  postForm: FormGroup;
  posts = [];
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.createPostForm();
    this.getAll();
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
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
}
