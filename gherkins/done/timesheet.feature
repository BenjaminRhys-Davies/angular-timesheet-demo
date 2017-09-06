Feature: As​ ​a​ ​user I​ ​can generate timesheets for a placement.

  Scenario: User can generate pre-populated timesheets
    Given​ the following timesheet data:
      | type    | client  | candidate | role   | date start | date end   |
      | weekly  | SomeBiz | Benjamin  | doctor | 02/01/2017 | 08/01/2017 |
  When​ I​ ​generate the timesheets
  Then​ I see a ​timesheet pre-populated with <client>, <candidate>, <role>, <date start>, <date end>
  And I see a timesheet with an empty billable time

  Scenario: User can generate multiple weekly timesheets
    Given​ ​I enter a start date of `02/01/2017`
    And I enter an end date of `05/02/2017`
    And I enter a timesheet type of `weekly`
    When​ I​ ​generate the timesheets
    Then​ ​I see 5 timesheets with following date ranges:
      | date start | date end   |
      | 02/01/2017 | 08/01/2017 |
      | 09/01/2017 | 15/01/2017 |
      | 16/01/2017 | 22/01/2017 |
      | 23/01/2017 | 29/01/2017 |
      | 30/01/2017 | 05/02/2017 |

  Scenario: User can generate partial-week timesheets that can span multiple weeks
    Given​ ​I enter a start date of `04/01/2017`
    And I enter an end date of `12/01/2017`
    And I enter a timesheet type of `weekly`
    When​ I​ ​generate the timesheets
    Then​ ​I see 2 timesheets with following date ranges:
      | date start | date end   |
      | 04/01/2017 | 08/01/2017 |
      | 09/01/2017 | 12/01/2017 |

  Scenario: User can generate partial-month timesheets that can span multiple months
    Given​ ​I enter a start date of `04/01/2017`
    And I enter an end date of `12/05/2017`
    And I enter a timesheet type of `monthly`
    When​ I​ ​generate the timesheets
    Then​ ​I see 5 timesheets with following date ranges:
      | date start | date end   |
      | 04/01/2017 | 31/01/2017 |
      | 01/02/2017 | 28/02/2017 |
      | 01/03/2017 | 31/03/2017 |
      | 01/04/2017 | 30/04/2017 |
      | 01/05/2017 | 12/05/2017 |
