$(document).ready(function () {

    //Сбрасываем значения текстовых полей до стандартных 
    $('.input').each(function (index) {
        var $this = $(this);
        $this.val($this.data('value'));
    });

    //Количество процессоров (CPU)
    $("#slider").slider({
        range: "min",
        animate: true,
        value: 1,
        min: 1,
        max: 256,
        slide: function (event, ui) {
            update(1, ui.value); //Вызываем функцию, которая при изменении значения ползунка меняет значение текстового поля
            calcT(); //Вызываем функцию технического калькулятора
        }
    });

    //Оперативная память (ОЗУ)
    $("#slider2").slider({
        range: "min",
        animate: true,
        value: 1,
        min: 1,
        max: 512,
        slide: function (event, ui) {
            update(2, ui.value); //Вызываем функцию, которая при изменении значения ползунка меняет значение текстового поля
            calcT(); //Вызываем функцию технического калькулятора
        }
    });

    //Дисковая память (SATA-диски, RAID10)
    $("#slider3").slider({
        range: "min",
        animate: true,
        value: 20,
        min: 20,
        max: 10000,
        slide: function (event, ui) {
            update(3, ui.value); //Вызываем функцию, которая при изменении значения ползунка меняет значение текстового поля
            calcT(); //Вызываем функцию технического калькулятора
        }
    });

    //Дисковая память повышенной производительности (SAS-диски, RAID10)
    $("#slider4").slider({
        range: "min",
        animate: true,
        value: 0,
        min: 0,
        max: 10000,
        slide: function (event, ui) {
            update(4, ui.value); //Вызываем функцию, которая при изменении значения ползунка меняет значение текстового поля
            calcT(); //Вызываем функцию технического калькулятора
        }
    });

    //Виртуальный роутер
    $("#slider5").slider({
        range: "min",
        animate: true,
        value: 1,
        min: 1,
        max: 50,
        slide: function (event, ui) {
            update(5, ui.value); //Вызываем функцию, которая при изменении значения ползунка меняет значение текстового поля
            calcT(); //Вызываем функцию технического калькулятора
        }
    });

    //Количество сотрудников
    $("#slider6").slider({
        range: "min",
        animate: true,
        value: 1,
        min: 1,
        max: 50,
        slide: function (event, ui) {
            update(6, ui.value); //Вызываем функцию, которая при изменении значения ползунка меняет значение текстового поля
            calcB() //Вызываем функцию бизнес-калькулятора
        }
    });

    //Переключатель калькуляторов
    $('.js-switch').on('click', function () {
        var $this = $(this), //Кнопка, которую нажали
            $id = $this.data('id'); //id будущего активного калькулятора
        $('.js-switch').removeClass('active'); //Удаляем стили переключателей
        $('.js-calc').removeClass('active'); //Удаляем стили переключателей
        $this.addClass('active'); //Применяем стили на нажатую кнопку
        $($id).addClass('active'); //Применяем стили на активный калькулятор
        return false;
    });

    //checkbox
    $('.js-checkbox').on('click', function () {
        var $this = $(this), //checkbox, который нажали
            $id = $this.data('id'); //id текстового поля

        //Проверка активен / Неактивен checkbox
        if ($this.hasClass('active')) {
            $this.removeClass('active'); //Делаем неактивным
            $($id).val(0);
        } else {
            $this.addClass('active'); //Делаем активным
            $($id).val(1).focus();
        }
        calcB() //Вызываем функцию бизнес-калькулятора
        return false;
    });

    //Изменение значения в текстовом поле + checkbox
    $('.js-input').on('keyup', function () {
        var $this = $(this), //Текстовое поле
            $id = $this.data('id'), //id checkbox
            $value = parseInt($this.val()); //Значение текстового поля

        if ($value > 0) {
            $($id).addClass('active'); //Делаем активным checkbox
        } else {
            $($id).removeClass('active'); //Делаем неактивным checkbox
        }
        calcB() //Вызываем функцию бизнес-калькулятора
    });

    //Изменение значения в текстовом поле + ползунок
    $('.js-input2').on('keyup', function () {
        var $this = $(this), //Текстовое поле
            $id = $this.data('id'), //id ползунка
            $value = parseInt($this.val()); //Значение текстового поля

        if ($value < 1) {
            $value = 1;
        }

        //Меняем значение ползунка
        $($id).slider("value", $value);

        if ($this.attr('id') == 'js-input6') { //Если текстовое поле "количество сотрудников"
            calcB() //Вызываем функцию бизнес-калькулятора
        } else {
            calcT(); //Вызываем функцию технического калькулятора	
        }
    });

}); //END $(document).ready

//Технический калькулятор
function calcT() {
    var $sum1 = parseInt($('#js-input1').val()) * 500, //Количество процессоров (CPU)
        $sum2 = parseInt($('#js-input2').val()) * 200, //Оперативная память (ОЗУ)
        $sum3 = parseInt($('#js-input3').val()) * 5, //Дисковая память (SATA-диски, RAID10)
        $sum4 = parseInt($('#js-input4').val()) * 15, //Дисковая память повышенной производительности (SAS-диски, RAID10)
        $total = 0; //вся сумма

    //Проверяем, если введено не число или число меньше минимального,  то устанавливаем минимальные значения
    if (isNaN($sum1) || $sum1 < 500) {
        $sum1 = 500;
    }
    if (isNaN($sum2) || $sum1 < 200) {
        $sum2 = 200;
    }
    if (isNaN($sum3) || $sum1 < 100) {
        $sum3 = 100;
    }
    if (isNaN($sum4)) {
        $sum4 = 0;
    }

    $total = $sum1 + $sum2 + $sum3 + $sum4;
    $('#js-total2').text($total + 'руб./месяц'); //Вставляем сумму
}

//Бизнес-калькулятор
function calcB() {
    var $sum6 = parseInt($('#js-input6').val()) * 356, //Количество сотрудников
        $sum7 = parseInt($('#js-input7').val()) * 800, //Общая схема (от 800 руб./месяц)
        $sum8 = parseInt($('#js-input8').val()) * 1000, //Виртуальный сервер (от 1000 руб./месяц)
        $sum9 = parseInt($('#js-input9').val()) * 1200, //Интернет-магазин (от 1200 руб./месяц)
        $sum10 = parseInt($('#js-input10').val()) * 1600, //Комплексное решение, включающее 1С, интернет-магазин и терминальный сервер (от 1600 руб./месяц)
        $total = 1644; //Вся сумма, стартовая сумма 2000 (1644 + 356 за одного пользователя)

    //Проверяем, если не число, то устанавливаем  0 
    if (isNaN($sum6) || $sum6 < 356) { //или  если меньше минимального, то устанавливаем минимальные значения
        $sum6 = 356;
    }
    if (isNaN($sum7)) {
        $sum7 = 0;
    }
    if (isNaN($sum8)) {
        $sum8 = 0;
    }
    if (isNaN($sum9)) {
        $sum9 = 0;
    }
    if (isNaN($sum10)) {
        $sum10 = 0;
    }

    $total = $total + $sum6 + $sum7 + $sum8 + $sum9 + $sum10;
    console.log($total);
    $('#js-total').text($total + 'руб./месяц'); //Вставляем сумму
}

//При изменении значения ползунка, меняем значение текстового поля
function update($slider, $val) {
    $('#js-input' + $slider).val($val);
}
