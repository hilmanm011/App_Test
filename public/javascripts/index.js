const submitFunction = ()=>{
    const nameValue = $('#name').val()
    const dateValue = $('#date').val()
    if (nameValue !== '') {
        $('#invalidName').attr('hidden', true)
        if (dateValue !== '') {
            $('#invalidDate').attr('hidden', true)
            const data = {
                name: nameValue,
                date: dateValue
            }
            sendDataToServer(data)
        } else {
            $('#invalidDate').attr('hidden', false)
        }
    } else {
        $('#invalidName').attr('hidden', false)
    }
}

const backButton = ()=>{
    $('#cardFormResult').attr('hidden', true)
    $('#cardFormInput').attr('hidden', false)
}

const sendDataToServer = (data)=>{
    $.ajax({
        method: 'POST',
        url: '/process',
        data: data,
        success: (response)=>{
            $('#nameResult').html(response.data.name)
            $('#yearAge').html(`${response.data.age.year} Tahun`)
            $('#monthAge').html(`${response.data.age.month} Bulan`)
            $('#dayAge').html(`${response.data.age.day} Hari`)
            $('#zodiac').html(response.data.zodiacName)

            $('#cardFormResult').attr('hidden', false)
            $('#cardFormInput').attr('hidden', true)
        },
        error: (err)=>{
            console.log(err);
        }
    })
}