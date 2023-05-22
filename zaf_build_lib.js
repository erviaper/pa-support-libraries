function evaluateFormula(formulaValue) {
  var variableIndeces = getIndecesOf('{{', formulaValue);
  var tempInputVariables = [];
  variableIndeces.forEach(thisIndex => {
    var thisEndingIndex = formulaValue.indexOf('}}', thisIndex);
    var thisVariableName = formulaValue.slice(thisIndex + 2, thisEndingIndex);
    console.log("thisVariableName ", thisVariableName);
    console.log('  check for already exist in tempInputVariables ', JSON.stringify(tempInputVariables));
    var alreadyExists = tempInputVariables.some(thisTempVar => thisTempVar.variableName == thisVariableName);
    console.log("  alreadyExists ", alreadyExists);
    if (!alreadyExists) {
      tempInputVariables.push({
        "variableName": thisVariableName,
        "value": zaf_build_vars[thisVariableName]
      });
    }
    console.log("tempInputVariables ", tempInputVariables);       // now I have a deduped list of field names, and their values
  });
  tempInputVariables.forEach(thisVariableObj => {
    var stringToReplace = '{{' + thisVariableObj.variableName + '}}';
    //var replacementValue = "${" + inputObject.value + "}";
    var replacementValue = thisVariableObj.value;
    console.log("replacementValue ", replacementValue);
    if (replacementValue == '') {
      replacementValue = '""';
    } else if (isNaN(replacementValue)) {
      replacementValue = '"' + replacementValue + '"';
    }
    formulaValue = formulaValue.replaceAll(stringToReplace, replacementValue);
    console.log("  updated formulaValue ", formulaValue);
  })
  console.log("final formulaValue ", formulaValue);
  formulaValue = '`' + formulaValue + '`';
  formulaValue = eval(formulaValue);
  console.log('formulaValue after eval ', formulaValue);
  //formulaValue = formulaValue.slice(1);
  //formulaValue = formulaValue.slice(0, -1);
  return formulaValue;
  function getIndecesOf(searchStr, str) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) { return []; }
    var startIndex = 0, index, indices = [];
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      startIndex = index + searchStrLen;
      indices.push(index);
    }
    return indices;
  }
}
