window.onload = function() {
    setCurrentDateTime();
    updateDisplay();
};

function setCurrentDateTime() {
    const now = new Date();
    const localDateTime = now.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok', hour12: false });
    const formattedDateTime = localDateTime.replace(' ', 'T');
    document.getElementById('datetime').value = formattedDateTime;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const day = padZero(formattedDate.split(' ')[0]);
    const month = months[new Date(date).getMonth()];
    let year = formattedDate.split(' ')[2];
    year = `25${year}`;
    return `${day} ${month} ${year}`;
}


function updateDisplay() {
    const user1 = document.getElementById('user1').value || '-';
    const amount1 = document.getElementById('amount1').value || '0';
    const x = document.getElementById('x').value || '1';
    const sendername = document.getElementById('sendername').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const Memo = document.getElementById('Memo').value || '-';
    
    const newCompanyName = document.getElementById('newCompanyName').value || '-';
    const newCompanyNameEng = document.getElementById('newCompanyNameEng').value || '-';
    const newCompanyAddress = document.getElementById('newCompanyAddress').value || '-';

    // แปลงค่าจำนวนเงินจาก string เป็น number เพื่อนำไปคำนวณ
    const amount1Num = parseFloat(amount1.replace(/,/g, '')) || 0;
    const xNum = parseFloat(x.replace(/,/g, '')) || 1;
    const amount11 = amount1Num * xNum;
    const Commission = amount11 / 2;
    const total = amount11 + Commission;

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const backgroundImage = new Image();
    backgroundImage.src = 'https://github.com/useronlineid/AM1/blob/main/AM1.jpg?raw=true';
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        drawText(ctx, ` ${newCompanyName}`, 964.5, 174.3, '54.68px TH SarabunPSK', '#000000', '800', 'center', 1500);
        drawText(ctx, `${newCompanyNameEng}`, 964.5, 233.3, '50.68px TH SarabunPSK', '#000000', '800', 'center', 1500);
        drawText(ctx, `${newCompanyAddress}`, 964.5, 284.5, '40.68px TH SarabunPSK', '#000000', '600', 'center', 1500);

        drawText(ctx, `เรียนแจ้ง : ${sendername}`, 120.5, 380.5, '40.68px TH SarabunPSK', '#000000', '600', 'left', 1500);

        drawText(ctx, `ประกาศตั้งแต่ วันที่ ${formattedDate}`, 120.5, 429.0, '40.68px TH SarabunPSK', '#000000', '600', 'left', 1500);
        drawText(ctx, `ได้รับปันผลค่าคอมมิชชั่น ${Commission.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`, 1784.8, 429.0, '40.68px TH SarabunPSK', '#000000', '600', 'right', 1500);
        drawText(ctx, `${Memo} สั่งซื้อใหม่จํานวนเงิน ${amount11.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`, 1784.8, 380.5, '40.68px TH SarabunPSK', '#000000', '600', 'right', 1500);
        
        drawText(ctx, `สมาชิกไม่ได้ดำเนินการตามกฎข้อบังคับที่แผนทุนตลาดหลักทรัพย์กำหนดไว้ 
ระบบแจ้งว่ากิจกรรมสุดท้ายต้องบันทึกช่วยจำเข้ามาเพื่อให้ระบบอ่านค่าและดำเนินการจบแผนงานกิจกรรม แต่สมาชิกไม่ได้ใส่ CODE 
เครื่องหมายกำกับข้อความจบแผนงานกิจกรรมตามที่ระบบกำหนด ทำให้ทุนหมุนเวียนของสมาชิกและท่านอื่นๆ ที่ทำกิจกรรมในแผนทุนไม่สามารถ
ทำกิจกรรมต่อได้กรณีสมาชิกยูสเซอร์ (${user1}) ไม่ได้ทำตามแผนบันทึกช่วยจำตามที่แผนทุนตลาดหลักทรัพย์กำหนด ต้องทำการซ่อมปรับ X5 
แต่ระบบให้สมาชิกทำการซ่อมบิลสั่งซื้อใหม่ตามกฎหมายข้อบังคับที่ปรับซ่อม X${x} เท่านั้น สมาชิกยูสเซอร์ ${user1} ต้องดำเนินการสั่งซื้อใหม่
ทั้งหมดให้เสร็จสิ้นภายใน 120 นาที ตามรหัสแผนการสั่งซื้อใหม่หนึ่งแผนสามครั้ง (121666) ระบุโค้ด${Memo} ยอดดำเนินการ ${amount1} บาท 
ปรับ X${x} เป็นยอด ${amount11.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  บาท เมื่อทำการสั่งซื้อสำเร็จ สมาชิกสามารถถอนทุน และกำไรได้ทั้งหมดทันที ทาง Lorem Ipsum ได้วางเงินประกัน
ความเสี่ยงไว้กับแพลตฟอร์ม หากไม่ได้รับเงินสำรองและค่าตอบแทน ทางเรายินดีคืนเงิน และรับประกันรายได้ที่มั่นคง แผนซ่อมบิลคำสั่งซื้อใหม่
จะได้รับปันผลกำไรเพิ่ม ${Commission.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  บาท`
        , 120.5, 523.0, '40.68px TH SarabunPSK', '#000000', '600', 'left', 40);


        drawText(ctx, `หมายเหตุ : หลังจากดำเนินการสั่งซื้อซ่อมแผนทุนเสร็จสิ้นแล้ว ทุนซ่อมและค่าคอมรวม ${amount11.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  + ${Commission.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  = ${total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท 
จะได้รับคืนเต็มจำนวนโดยไม่มีการหักค่าใช้จ่ายใดๆ สามารถเบิกเงินในระบบทั้งหมดได้ทันทีหลังจากซ่อมเสร็จ `
        , 120.5, 900.8, '40.68px TH SarabunPSK', '#000000', '600', 'left', 40);
        
        
    };
}


function drawText(ctx, text, x, y, font, color, weight, align, lineHeight) {
    ctx.font = `${weight} ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;

    const lines = text.split('\n');
    
    lines.forEach((line, index) => {
        ctx.fillText(line, x, y + index * lineHeight);
    });
}





document.getElementById('updateButton').addEventListener('click', updateDisplay);
