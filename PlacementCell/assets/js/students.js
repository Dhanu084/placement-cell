{
  let fetch = $('#batch');
  console.log(fetch);
  fetch.on('change', function () {
    console.log(this.value);
    let data = this.value;
    $.ajax({
      type: 'get',
      url: '/students/view-students',
      data: this.value,
      success: function (data) {
        console.log(data);
      },
      error: function (err) {
        console.log(err.responseText);
      },
    });
  });
}
