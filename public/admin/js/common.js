function serializeArrayToJson(form) {
  let result = {};

  // 将一组表单元素编码为名称和值的数组。Jquery文档serializeArray()方法
  let formAry = form.serializeArray();
  formAry.forEach((item) => {
    result[item.name] = item.value;
  });
  return result;
}
