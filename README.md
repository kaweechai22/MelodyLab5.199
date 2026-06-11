# MelodyLab v5.104 Speed of Sound Extra Slow Motion

ปรับหน้า Displacement and Pressure ให้กราฟกินพื้นที่แนวตั้งเต็มขึ้นบนจอมือถือ
- เพิ่มความสูง canvas สำหรับหน้า Displacement and Pressure / Longitudinal
- ขยายความสูงของกราฟบน-ล่างให้ใช้พื้นที่เกือบเต็ม slot
- ลดช่องว่างใต้กราฟล่าง
- คงพฤติกรรมความถี่, แอมพลิจูด, อัตราเร็วคลื่น, เฟส และความต่างเฟส

## v5.104 Speed of Sound Extra Slow Motion
- เลื่อน badge “Phase Difference: Δφ = ...°” ลงมาอยู่ในกรอบกราฟการกระจัด
- แก้ไม่ให้ข้อความ Phase Difference ซ้อนทับกับลูกศรทิศทางการเคลื่อนที่ของคลื่น
- คงการขยายกราฟแนวตั้งและการปรับความถี่ f จาก v5.88

## v5.104 Speed of Sound Extra Slow Motion
- ปรับกราฟ Longitudinal Wave ให้อนุภาคสั่นซ้าย–ขวารอบตำแหน่งสมดุล
- เพิ่มจุดสมดุลสีจางและจุดจริงของอนุภาค เพื่อให้เห็นว่าอนุภาคไม่ได้ไหลไปกับคลื่น
- แสดงส่วนอัด–ส่วนขยายจากความหนาแน่นของอนุภาค
- เพิ่มลูกศร “การสั่นของอนุภาค” ที่จุดสังเกต
- แก้ให้ f และ v ส่งผลต่อความยาวคลื่นของหน้า Longitudinal Wave ผ่าน λ = v/f
- คงหน้า Displacement and Pressure จาก v5.89


## v5.104 Speed of Sound Extra Slow Motion
- ลบหัวข้อ Longitudinal / Transverse ออกจากเมนู Wave Visualizer
- เพิ่มหัวข้อใหม่ Speed of Sound (อัตราเร็วเสียง)
- ภาพจำลองใหม่แสดงแหล่งกำเนิดเสียง ไมโครโฟน ระยะทาง d เวลาที่เสียงเดินทาง Δt และอัตราเร็วเสียง v
- ใช้ความสัมพันธ์ v = d / Δt และ v ≈ 331 + 0.6T
- เพิ่มการส่งออกข้อมูลของหัวข้อ Speed of Sound Extra Slow Motion ตามชื่อหัวข้อ

## v5.104 Speed of Sound Extra Slow Motion
- ปรับหน้า Speed of Sound เป็นสื่อการสอนฟิสิกส์ชัดเจน
- แสดงแหล่งกำเนิดเสียง ไมโครโฟน พัลส์เสียง เส้นระยะทาง d ค่า Δt และสูตร v = d/Δt
- เพิ่มตัวควบคุม Distance d, Temperature T, Time Speed และแสดงค่า v, Δt อัตโนมัติ
- คงการลบหัวข้อ Longitudinal / Transverse ออกจากเมนู Wave Visualizer

## v5.104 Speed of Sound Extra Slow Motion
- ปรับหน้า Speed of Sound ให้ใช้รูปแบบเดียวกับ Longitudinal, Pressure, Displacement and Pressure
- ใช้ class ชุด visualizerTemplatePage / longitudinalFocusPage / longitudinalFocusGrid / longitudinalMainViz / neonControlViz
- ใช้ปุ่มเล่น หยุด รีเซ็ต และปุ่มส่งออกแบบเดียวกับสามหน้าหลัก
- ใช้รูปแบบพารามิเตอร์แบบ neonParamRow เดียวกัน
- คงภาพจำลองอัตราเร็วเสียงและสมการ v = d/Δt, v = 331 + 0.6T

## v5.104 Speed of Sound Extra Slow Motion
- เปลี่ยนสัญลักษณ์ระยะทางจาก d เป็น s ในหน้า Speed of Sound
- ปรับสูตรเป็น v = s / Δt
- ปรับ Time Speed ให้ช้าลง ค่าเริ่มต้น 0.10× ช่วง 0.03×–1.00×
- เพิ่ม slow-motion display factor เพื่อให้เห็นการเดินทางของพัลส์เสียงชัดขึ้น โดยค่าฟิสิกส์ v และ Δt ยังคำนวณจริง
- เพิ่ม export alias parameter_path_length_s_m

## v5.104 Speed of Sound Extra Slow Motion
- ปรับพัลส์เสียงให้ช้าลงกว่ารอบ v5.95
- Time Speed ค่าเริ่มต้น 0.05× ช่วง 0.01×–0.50×
- เพิ่ม slow-motion display factor จาก 10 เป็น 40 เพื่อให้เห็นการเดินทางของพัลส์เสียงชัดขึ้นมาก
- ค่าฟิสิกส์ v และ Δt ยังเป็นค่าจริง ไม่ได้ถูกทำให้ช้าตามภาพ

## v5.104 Add Sound Topics
- เพิ่ม 7 หัวข้อเสียงใน Wave Visualizer ต่อจาก Speed of Sound พร้อมหน้าเบื้องต้นและภาพจำลอง canvas

## v5.104 Physics Checked Sound Topics
- จัดเมนู Wave Visualizer ตามแผนที่ 1–13 รวม 21 หัวข้อ และปรับหัวข้อ 5–21 ตามหลักฟิสิกส์ก่อนลงโค้ด

## v5.104 Physics Corrections
- แก้ init() ไม่ให้หน้า Visualizer ย่อย crash จากปุ่ม/element ของหน้าวัดเสียงที่ไม่มีในหน้านั้น
- ทำปุ่มเล่น/หยุด/รีเซ็ต/บันทึก PNG ให้ null-safe
- เพิ่ม listener ให้ slider หัวข้อใหม่ครบ เช่น mode, length, source level, protection
- คงเมนู Wave Visualizer 21 หัวข้อจาก v5.99

## v5.104 Physics Corrections
- แก้หัวข้อใหม่ให้มี animation จริงเมื่อกด Play
- ปรับ slider ให้มีผลต่อภาพจำลอง เช่น มุมสะท้อน ช่องเปิด ระยะห่างแหล่งกำเนิด โหมดท่อ เลขมัค ระดับเสียง
- กด Play/Pause/Reset แล้ว redraw ทันที
- คงเมนู 21 หัวข้อและ runtime fix จาก v5.100

## v5.104 Physics Corrections
- ตรวจครบ 21 หัวข้อใน Wave Visualizer
- เพิ่ม/ซ่อมพารามิเตอร์ให้หัวข้อ 5–21 ปรับได้จริงตามภาพจำลอง
- เพิ่ม input/change listener ให้ range และ select ทุกหัวข้อ
- เพิ่ม session.html redirect ป้องกันลิงก์บันทึกผลเดิมเป็น 404

## v5.104 Physics Corrections
- คง 4 หน้าแรกไว้เป็นแม่แบบ ไม่แก้โครงหลัก
- Rebuild หัวข้อ 5–21 ใหม่ให้ใช้ layout/control/export แบบเดียวกับ 4 หน้าแรก
- เพิ่มรายละเอียดฟิสิกส์และกราฟ/แถบค่าใน canvas ให้สื่อความหมายมากขึ้น
- ทุกหัวข้อมี Play/Pause/Reset, parameter control, canvas animation และ export

## v5.104 Physics Corrections
- แก้การสั่นพ้องของอากาศในท่อให้คำนวณ fₙ ตามหลักฟิสิกส์:
  - ท่อเปิดสองด้าน: fₙ = nv/(2L)
  - ท่อปิดหนึ่งด้าน: fₙ = (2n−1)v/(4L)
- เพิ่มสูตร Doppler สำหรับผู้สังเกตนิ่ง:
  - ด้านหน้า: f′ = f v/(v−vₛ)
  - ด้านหลัง: f′ = f v/(v+vₛ)
- คง 4 หน้าแรกและ template ของ v5.103
