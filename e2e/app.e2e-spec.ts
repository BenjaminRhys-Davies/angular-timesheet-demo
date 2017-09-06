import {TimesheetPage} from './app.po';

describe('Timesheet App', () => {
  let page: TimesheetPage;

  beforeEach(() => {
    page = new TimesheetPage();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getParagraphText()).toEqual('Welcome to Hard Rock Recruitment');
  });

  it('should display a form', () => {
    expect(page.getForm()).toBeTruthy();
  });

  describe('can generate multiple weekly', () => {
    beforeEach(() => {
      page.populatePlacement('02/01/2017', '05/02/2017');
      page.selectPlacementType('Weekly');
      page.submitPlacement();
    });

    it('timesheets', () => {
      expect(page.getNumberOfTimesheets()).toEqual(5);
    });

    it('with the expected dates', () => {
      expect(page.getStartDateText(0)).toEqual('Mon, 02 Jan 2017');
      expect(page.getEndDateText(0)).toEqual('Sun, 08 Jan 2017');

      expect(page.getStartDateText(1)).toEqual('Mon, 09 Jan 2017');
      expect(page.getEndDateText(1)).toEqual('Sun, 15 Jan 2017');

      expect(page.getStartDateText(2)).toEqual('Mon, 16 Jan 2017');
      expect(page.getEndDateText(2)).toEqual('Sun, 22 Jan 2017');

      expect(page.getStartDateText(3)).toEqual('Mon, 23 Jan 2017');
      expect(page.getEndDateText(3)).toEqual('Sun, 29 Jan 2017');

      expect(page.getStartDateText(4)).toEqual('Mon, 30 Jan 2017');
      expect(page.getEndDateText(4)).toEqual('Sun, 05 Feb 2017');
    });
  });

  describe('can generate partial-week', () => {
    beforeEach(() => {
      page.populatePlacement('04/01/2017', '12/01/2017');
      page.selectPlacementType('Weekly');
      page.submitPlacement();
    });

    it('timesheets', () => {
      expect(page.getNumberOfTimesheets()).toEqual(2);
    });

    it('that can span multiple weeks', () => {
      expect(page.getStartDateText(0)).toEqual('Wed, 04 Jan 2017');
      expect(page.getEndDateText(0)).toEqual('Sun, 08 Jan 2017');

      expect(page.getStartDateText(1)).toEqual('Mon, 09 Jan 2017');
      expect(page.getEndDateText(1)).toEqual('Thu, 12 Jan 2017');
    });
  });

  describe('can generate partial-month', () => {
    beforeEach(() => {
      page.populatePlacement('04/01/2017', '12/05/2017');
      page.selectPlacementType('Monthly');
      page.submitPlacement();
    });

    it('timesheets', () => {
      expect(page.getNumberOfTimesheets()).toEqual(5);
    });

    it('that can span multiple months', () => {
      expect(page.getStartDateText(0)).toEqual('Wed, 04 Jan 2017');
      expect(page.getEndDateText(0)).toEqual('Tue, 31 Jan 2017');

      expect(page.getStartDateText(1)).toEqual('Wed, 01 Feb 2017');
      expect(page.getEndDateText(1)).toEqual('Tue, 28 Feb 2017');

      expect(page.getStartDateText(2)).toEqual('Wed, 01 Mar 2017');
      expect(page.getEndDateText(2)).toEqual('Fri, 31 Mar 2017');

      expect(page.getStartDateText(3)).toEqual('Sat, 01 Apr 2017');
      expect(page.getEndDateText(3)).toEqual('Sun, 30 Apr 2017');

      expect(page.getStartDateText(4)).toEqual('Mon, 01 May 2017');
      expect(page.getEndDateText(4)).toEqual('Fri, 12 May 2017');
    });
  });

});
