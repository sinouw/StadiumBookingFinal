import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/Models/User.model';
import { log } from 'util';
import { baseurl } from '../Models/basurl.data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  Userbody: User
  Users: any[] = []
  UserID: any
  UserFullName: any
  UserN: any
  userRole

  loginStatus = false;

  HeaderAdminItems = [
    {
      state: 'home',
      name: 'HOME',
      type: 'link',
      icon: 'home'
    },
    {
      state: 'client/clubs',
      name: 'CLUBS',
      type: 'link',
      icon: 'home'
    },
    {
      state: 'client/terrains',
      name: 'TERRAINS',
      type: 'link',
      icon: 'home'
    },
    // {
    //   state: "pages",
    //   name: "PAGES",
    //   type: "sub",
    //   icon: "pages",
    //   children: [
    //     {
    //       state: 'about',
    //       name: 'ABOUT',
    //       type: 'link',
    //       icon: 'arrow_right_alt',
    //     },
    //     {
    //       state: 'term-condition',
    //       name: 'TERM AND CONDITION',
    //       type: 'link',
    //       icon: 'arrow_right_alt',
    //     },
    //     {
    //       state: 'privacy-policy',
    //       name: 'PRIVACY POLICY',
    //       type: 'link',
    //       icon: 'arrow_right_alt',
    //     },
    //     {
    //       state: 'blogs/detail',
    //       name: 'BLOG DETAIL',
    //       type: 'link',
    //       icon: 'arrow_right_alt',
    //     },
    //     {
    //       state: 'faq',
    //       name: 'FAQ',
    //       type: 'link',
    //       icon: 'arrow_right_alt',
    //     },
    //     {
    //       state: 'not-found',
    //       name: '404 PAGE',
    //       type: 'link',
    //       icon: 'arrow_right_alt',
    //     },
    //     {
    //       state: 'account/profile',
    //       name: 'User Profile',
    //       type: 'link',
    //       icon: 'arrow_right_alt',
    //     },
    //     {
    //       state: 'session',
    //       name: "SESSION",
    //       type: "subChild",
    //       icon: 'supervised_user_circle',
    //       children: [
    //         {
    //           state: 'session/signin',
    //           name: 'SIGN IN',
    //           type: 'link',
    //           icon: 'arrow_right_alt',
    //         },
    //         {
    //           state: 'session/signup',
    //           name: 'REGISTER',
    //           type: 'link',
    //           icon: 'arrow_right_alt',
    //         },
    //         {
    //           state: 'session/forgot-password',
    //           name: 'FORGET PASSWORD',
    //           type: 'link',
    //           icon: 'arrow_right_alt',
    //         },
    //         {
    //           state: 'session/thank-you',
    //           name: 'THANK YOU',
    //           type: 'link',
    //           icon: 'arrow_right_alt',
    //         }
    //       ]
    //     }
    //   ],
    // },
    {
      state: 'contact',
      name: "CONTACT US",
      type: "link",
      icon: 'perm_contact_calendar'
    },
    {
      state: 'admin-panel',
      name: "ADMIN PANEL",
      type: "link",
      icon: 'perm_identity'
    }
  ];

  HeaderOneItems = [
    {
      state: 'home',
      name: 'HOME',
      type: 'link',
      icon: 'home'
    },
    {
      state: 'client/clubs',
      name: 'CLUBS',
      type: 'link',
      icon: 'home'
    },
    {
      state: 'client/terrains',
      name: 'TERRAINS',
      type: 'link',
      icon: 'home'
    },

    {
      state: "pages",
      name: "PAGES",
      type: "sub",
      icon: "pages",
      children: [
        {
          state: 'about',
          name: 'ABOUT',
          type: 'link',
          icon: 'arrow_right_alt',
        },
        {
          state: 'term-condition',
          name: 'TERM AND CONDITION',
          type: 'link',
          icon: 'arrow_right_alt',
        },
        {
          state: 'privacy-policy',
          name: 'PRIVACY POLICY',
          type: 'link',
          icon: 'arrow_right_alt',
        },
        {
          state: 'blogs/detail',
          name: 'BLOG DETAIL',
          type: 'link',
          icon: 'arrow_right_alt',
        },
        {
          state: 'faq',
          name: 'FAQ',
          type: 'link',
          icon: 'arrow_right_alt',
        },
        {
          state: 'not-found',
          name: '404 PAGE',
          type: 'link',
          icon: 'arrow_right_alt',
        },
        {
          state: 'account/profile',
          name: 'User Profile',
          type: 'link',
          icon: 'arrow_right_alt',
        },
        {
          state: 'session',
          name: "SESSION",
          type: "subChild",
          icon: 'supervised_user_circle',
          children: [
            {
              state: 'session/signin',
              name: 'SIGN IN',
              type: 'link',
              icon: 'arrow_right_alt',
            },
            {
              state: 'session/signup',
              name: 'REGISTER',
              type: 'link',
              icon: 'arrow_right_alt',
            },
            {
              state: 'session/forgot-password',
              name: 'FORGET PASSWORD',
              type: 'link',
              icon: 'arrow_right_alt',
            },
            {
              state: 'session/thank-you',
              name: 'THANK YOU',
              type: 'link',
              icon: 'arrow_right_alt',
            }
          ]
        }
      ],
    },
    {
      state: 'contact',
      name: "CONTACT US",
      type: "link",
      icon: 'perm_contact_calendar'
    }
  ];

  HeaderItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private http: HttpClient
  ) { }

  readonly BaseURI = baseurl;


  login(formData) {
    return this.http.post(this.BaseURI + '/Login', formData)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/session/signin']);
  }

  putUser() {
    let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.http.put(this.BaseURI + '/SuperAdmin/Edit/' + payLoad.UserID, this.Userbody).subscribe(res => {
      console.log(res)
    })
  }

  putClientUser() {
    let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.http.put(this.BaseURI + '/Client/Edit/' + payLoad.UserID, this.Userbody).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  GetUsers() {
    let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.http.get(this.BaseURI + '/User/').subscribe(
      res => {
        this.Users = res as User[]
        this.Users = this.Users.filter(u => u.UserName != payLoad.UserName)
        console.log(res)
      },
      err => {
        console.log(err)
      })
    return this.Users
  }

  DeleteUser(username) {
    this.http.delete(this.BaseURI + '/user/delete/' + username).subscribe(
      res => {
        this.GetUsers()
      }, err => {
        console.log(err);

      })
  }

  getUserProfile() {
    // let headers_object = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.BaseURI + '/UserProfile');
  }
  getPayload() {
    let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad
  }

  getToken() {
    return localStorage.getItem('token');
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    let userRole = payLoad.role;
    let userid = payLoad.UserID;

    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
