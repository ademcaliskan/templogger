var os = require('os');

var Monitor = function () {
    this.hostname = os.hostname();
    this.sysInfo = 'on a ' + os.type() + ' ' + os.platform() + ' ' + os.arch()
            + ' System with ' + os.cpus().length + ' CPUs';

    this.totalmem = this.formatNumber(os.totalmem() / 1048576);
    this.uptime;
    this.freemem;
    this.load;
}

Monitor.prototype.setUptime = function () {
    var seconds = os.uptime();
    var hours = Math.floor(seconds / 3600),
            minutes = Math.floor((seconds - hours * 3600) / 60),
            seconds = (seconds - hours * 3600 - minutes * 60);

    this.uptime = hours + ':' + minutes + ':' + seconds;
}

Monitor.prototype.setFreemem = function () {
    this.freemem = this.formatNumber(os.freemem() / 1048576);
}

Monitor.prototype.setLoad = function () {
    this.load = this.formatNumber(os.loadavg()[0]);
}

Monitor.prototype.formatNumber = function (number) {
    return Math.round(number * 100) / 100;
}

Monitor.prototype.clearScreen = function () {
    for (var i = 0; i < process.stdout.rows; i++) {
        console.log('\r\n');
    }
}

Monitor.prototype.update = function () {
    this.setUptime();
    this.setFreemem();
    this.setLoad();
    return this;
}

Monitor.prototype.output = function () {
    this.clearScreen();
    console.log(this.hostname);
    console.log(this.sysInfo);
    console.log('Uptime ' + this.uptime);
    var free = this.freemem;
    var total = this.totalmem;
    console.log('Freemem: ' + free + ' MB of ' + total + ' MB');
    console.log('Load ' + this.load);
}

module.exports = Monitor;
// setInterval(function() {sysMon.update().output()}, 500);
