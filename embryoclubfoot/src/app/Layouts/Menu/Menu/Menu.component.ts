import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

import { MenuItems } from '../../../Core/menu/menu-items/menu-items';
import { AccountService } from 'src/app/AdminPanel/Service/account.service';

@Component({
  selector: 'embryo-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuComponent implements OnInit {

  expanded: boolean;
  role: any;

  constructor(
    public menuItems: MenuItems,
    public router: Router,
    public translate: TranslateService,
    private accountService: AccountService
  ) {


    this.getRoleBasedMenu();
    console.log(menuItems.getMainMenu());
  }

  ngOnInit() {
  }

  getRoleBasedMenu() {
    if(this.accountService.getToken()) {
      this.role = this.accountService.getPayload().role;
      if(this.role == 'SuperAdmin' || this.role == 'ClubAdmin') {
        this.accountService.HeaderItems = this.accountService.HeaderAdminItems;
      } else {
        this.accountService.HeaderItems = this.accountService.HeaderOneItems;
      }
    } else {
      this.accountService.HeaderItems = this.accountService.HeaderOneItems;
    }
  }

  public onItemSelected(item: any) {
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  public redirectTo(subchildState) {
    this.router.navigate([subchildState.state], { queryParams: { category: subchildState.queryState } });
  }
}
