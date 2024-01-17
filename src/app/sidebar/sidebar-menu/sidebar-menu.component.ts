import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { I18NService, Locale, LOCALES } from '../../state/i18n.service';
import { MatDialog } from '@angular/material/dialog';
import { HelpComponent } from '../../help/help.component';
import { ZsMapStateService } from '../../state/state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionService } from '../../session/session.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { ZsMapBaseDrawElement } from '../../map-renderer/elements/base/base-draw-element';
import { DatePipe } from '@angular/common';
import { exportProtocolExcel, mapProtocolEntry, ProtocolEntry } from '../../helper/protocolEntry';
import { ProtocolTableComponent } from '../../protocol-table/protocol-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShareDialogComponent } from '../../session/share-dialog/share-dialog.component';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent implements OnDestroy {
  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;

  static ONBOARDING_VERSION = '1.0';

  locales: Locale[] = LOCALES;
  protocolEntries: ProtocolEntry[] = [];
  private _ngUnsubscribe = new Subject<void>();

  constructor(
    public i18n: I18NService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public zsMapStateService: ZsMapStateService,
    public session: SessionService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
  ) {
    if (this.isInitialLaunch()) {
      this.dialog.open(HelpComponent, {
        data: true,
      });
    }

    this.zsMapStateService
      .observeDrawElements()
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((elements: ZsMapBaseDrawElement[]) => {
        this.protocolEntries = mapProtocolEntry(
          elements,
          this.datePipe,
          this.i18n,
          this.session.getLocale() === undefined ? 'de' : this.session.getLocale(),
        );
      });
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  isInitialLaunch(): boolean {
    const currentOnboardingVersion = localStorage.getItem('onboardingVersion');
    if (currentOnboardingVersion !== SidebarMenuComponent.ONBOARDING_VERSION) {
      localStorage.setItem('onboardingVersion', SidebarMenuComponent.ONBOARDING_VERSION);
      return true;
    }
    return false;
  }

  toggleHistory(): void {
    this.zsMapStateService.toggleDisplayMode();
  }

  help(): void {
    this.dialog.open(HelpComponent, { data: false });
  }

  protocolTable(): void {
    this.dialog.open(ProtocolTableComponent, { data: false });
  }

  protocolExcelExport(): void {
    exportProtocolExcel(this.protocolEntries, this.i18n);
  }

  print(): void {
    this.menu.closeMenu();
    setTimeout(() => {
      window.print();
    }, 0);
  }

  setLocale(locale: Locale) {
    this.session.setLocale(locale);
  }

  toggleHistoryIfButton(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (element.id === 'historyButton') {
      this.toggleHistory();
    }
    event.stopPropagation();
  }

  navigateEvents() {
    this.session.setOperation(undefined);
  }

  async copyShareLink(): Promise<void> {
    const url = await this.session.generateShareUrl();
    await navigator.clipboard.writeText(url);
    this._snackBar.open(this.i18n.get('copiedToClipboard'), this.i18n.get('ok'), { duration: 2000 });
  }

  async generateShareQrCode(): Promise<void> {
    const joinCode = await this.session.generateShareQrCode();
    this._dialog.open(ShareDialogComponent, {
      data: joinCode,
    });
  }
}
