import { AngularTimesheetDemoPage } from './app.po';

describe('angular-timesheet-demo App', () => {
  let page: AngularTimesheetDemoPage;

  beforeEach(() => {
    page = new AngularTimesheetDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
