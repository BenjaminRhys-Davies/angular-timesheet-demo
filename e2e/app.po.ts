import { browser, by, $, $$ } from 'protractor';

export class TimesheetPage {

  navigateTo () {
    return browser.get('/');
  }

  getParagraphText () {
    return $('.app__header h1').getText();
  }

  getStartDateText (index: number) {
    return $$('.timesheet__start').get(index).getText();
  }

  getEndDateText (index: number) {
    return $$('.timesheet__end').get(index).getText();
  }

  getForm () {
    return $('form.placement').isDisplayed();
  }

  getNumberOfTimesheets () {
    return $$('.timesheet').count();
  }

  populatePlacement (start: string, end: string) {
    $('.placement__candidate').sendKeys('candidate name');
    $('.placement__client').sendKeys('client name');
    $('.placement__role').sendKeys('job title');
    $('.placement__start').sendKeys(start);
    $('.placement__end').sendKeys(end);
    browser.waitForAngular();

    return $('form.placement');
  }

  selectPlacementType ( type: string ) {
    $('.placement__type').all(by.xpath('option[.="' + type + '"]')).click();
  }

  submitPlacement () {
    $('.placement__submit').click();
    browser.waitForAngular();
  }
}
