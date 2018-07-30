const UI = require('sketch/ui');

var replaceSelectedText = function(context, data, lable) {

  var selection = context.selection;
  var textLayerCount = 0;
  for (var i = 0, l = [selection count]; i < l; i++) {
    if (selection[i].class() == MSTextLayer) {
      textLayerCount++;
    }
  }

  if (textLayerCount > 0) {

    var userInput = COSAlertWindow.new();
    userInput.setMessageText('批量替换选中文本');
    userInput.addTextLabelWithValue('当前已选中 ' + textLayerCount + ' 个文字图层，请输入替换文本：');
    userInput.addTextFieldWithValue('');
    userInput.addButtonWithTitle('OK');
    userInput.addButtonWithTitle('Cancel');
    userInput.alert().window().setInitialFirstResponder(userInput.viewAtIndex(1)); //默认选中第一个 TextField

    var responseCode = userInput.runModal();

    if (responseCode == 1001) {
      UI.message("⚠️已取消");
    } else {
      var inputString = userInput.viewAtIndex(1).stringValue();
      if (inputString == '') {
        UI.message("⚠️内容不能为空");
      } else {
        for (var i = 0, l = [selection count]; i < l; i++) {
          var layer = selection[i];
          if (layer.class() == MSTextLayer) {
            [layer setStringValue: inputString];
            [layer setName: inputString];
            [layer adjustFrameToFit];
          }
        }
      }
    }
  } else {
    UI.message("⚠️请选择需替换的文字图层");
  }

};
