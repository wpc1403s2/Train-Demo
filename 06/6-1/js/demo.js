/**
 * Created by wpc on 2017/5/17.
 */
var CalculatorModel=function () {
    var self = this;
    var NAN = 'NAN';

//    存放指令
    self.commands = [
        {command: 'sin', action: 'Math.sin(__param__)'},
        {command: 'cos', action: 'Math.cos(__param__)'},
        {command: 'tan', action: 'Math.tan(__param__)'},

    ];
    self.operator=[
        {command: ' + '},
        {command: ' - '},
        {command: ' * '},
        {command: ' / '},
    ]
//    存放数字
    self.numbers = [
        {val: 1},
        {val: 2},
        {val: 3},
        {val: 4},
        {val: 5},
        {val: 6},
        {val: 7},
        {val: 8},
        {val: 9},
        {val: 0},
    ];
//    显示的结果
    self.commandline = ko.observable('');
//    上一次的指令
    self.lastCommand = ko.observable('');
//    是否清除
    self.needCleanup = ko.observable(false);
//    添加数字
    self.addNumber = function (e) {
        console.log(self.needCleanup())
        if (self.needCleanup()) {
            self.commandline('');
            self.needCleanup(false);
        }
        //    不再添加0
        if(this.val==0&&self.commandline()==''){
            return;
        }
        self.commandline(self.commandline()+this.val)
    };
//    添加指令
    self.addCommand=function (e) {
        if(e.action&&self.commandline()){
            var newCommand = e.action.replace('__param__', self.commandline());
            self.commandline(parseFloat(eval(newCommand)).toFixed(5));
        }
            if(!e.action){
                self.commandline(self.commandline() + e.command);
            }
            self.lastCommand(e.command);
    };
//    计算
    self.doCalculate=function (e) {
        console.log(self.commandline());
        var line = self.commandline().toString();
        if(line.indexOf('/ 0')!=-1){
            self.commandline('NAN');
            self.needCleanup(true);
        }
        var rel=eval(self.commandline());

        if(rel.toString().indexOf('.')!=-1){
            self.commandline(parseFloat(rel).toFixed(5))
        }else {
            self.commandline(rel)
        }
        if(self.lastCommand()!=''){
            self.lastCommand('');
        }
        // self.needCleanup(true);
    };
    self.hasNumber=ko.computed(function () {
        return self.commandline() == "";
    },self);
    self.ClearAll=function (e) {
        self.commandline('');
        self.lastCommand('');
    }

};
ko.applyBindings(new CalculatorModel());