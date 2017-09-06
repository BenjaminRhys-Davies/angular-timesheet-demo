beforeEach(function () {
  this.pad = (num: number, minLength: number = 2): string => {
    const paddedString = `${ num }`;
    return paddedString.length > minLength ?
      paddedString :
      '0'.repeat(minLength - paddedString.length) + paddedString;
  };

  this.randomTimeStamp = (): string => {
    const hour = Math.floor(Math.random() * 23);
    const minute = Math.floor(Math.random() * 59);
    const second = Math.floor(Math.random() * 59);
    const millisecond = Math.floor(Math.random() * 999);

    return `${ this.pad(hour) }:${ this.pad(minute) }:${ this.pad(second) }.${ this.pad(millisecond, 3) }`;
  };

  this.dispatchEvent = (querySelector: string, event: string = 'change') => {
    const evObj: Event = document.createEvent('HTMLEvents');
    evObj.initEvent(event, true, true);
    document.querySelector(querySelector).dispatchEvent(evObj);
  };
});
