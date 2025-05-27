document.addEventListener('DOMContentLoaded', () => {
  const calEl = document.querySelector('.cal');
  const scheduleList = document.querySelector('.schedule-list');
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  const events = [
    { date: '2025-05-01', end: '2025-05-05', title: '연속 요가 클래스', link: '/event/yoga' },
    { date: '2025-05-02', end: '2025-05-06', title: '도서관 작가 강연', link: '/event/author-talk' },
    { date: '2025-05-03', end: '2025-05-07', title: '어린이날 공연', link: '/event/child-show' },
    { date: '2025-05-05', end: '2025-05-09', title: '3일간 조깅 모임', link: '/event/jogging' },
    { date: '2025-05-22', end: '2025-05-26', title: '요리 워크샵', link: '/event/cooking' }
  ];

  // 색상 부여
  const colors = ['#FF5722','#3F51B5','#009688','#E91E63','#FFC107'];
  events.forEach((ev,i) => ev.color = colors[i % colors.length]);

  function formatYMD(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function renderCalendar() {
    calEl.innerHTML = `
      <div class="calendar-header">
        <button id="prev">&lt;</button>
        <div class="month-year">${year}년 ${month+1}월</div>
        <button id="next">&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>일</th><th>월</th><th>화</th><th>수</th>
            <th>목</th><th>금</th><th>토</th>
          </tr>
        </thead>
        <tbody id="cal-body"></tbody>
      </table>
    `;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month+1, 0).getDate();
    const tbody = document.getElementById('cal-body');
    tbody.innerHTML = '';
    let row = document.createElement('tr');

    // 빈칸
    for (let i=0; i<firstDay; i++) {
      const td = document.createElement('td');
      td.classList.add('empty');
      row.appendChild(td);
    }

    // 날짜 셀
    for (let d = 1; d <= lastDate; d++) {
      const td = document.createElement('td');
      const cellDate = new Date(year, month, d);
      const ymd = formatYMD(cellDate);
      td.textContent = d;
      td.dataset.date = ymd;
      if (ymd === formatYMD(today)) td.classList.add('today');
    
      // 이 날짜에 해당하는 이벤트들
      const matched = events.filter(ev => ymd >= ev.date && ymd <= ev.end);
    
      // 1) 연속 이벤트만 골라서, 시작일 기준 오름차순 정렬
      const continuous = matched
        .filter(ev => ev.end !== ev.date)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
      continuous.forEach((ev, idx) => {
        const bar = document.createElement('div');
        bar.className = 'event-bar';
        bar.style.background = ev.color;
        bar.style.top = `${2 + idx * 9}px`;   // 위에서부터 9px 간격으로
        td.appendChild(bar);
      });
    
      // 2) 하루 이벤트(dot) 처리 (원래대로)
      const single = matched.filter(ev => ev.end === ev.date);
      single.forEach((ev, idx) => {
        const dot = document.createElement('div');
        dot.className = 'event-dot';
        dot.style.background = ev.color;
        const offset = (idx - (single.length - 1) / 2) * 8;
        dot.style.left = `calc(50% + ${offset}px)`;
        td.appendChild(dot);
      });
    
      td.addEventListener('click', () => selectDate(td, ymd));
      row.appendChild(td);
      if ((firstDay + d) % 7 === 0) {
        tbody.appendChild(row);
        row = document.createElement('tr');
      }
    }
    

    // 마지막 빈칸 채우기
    if (row.children.length) {
      while (row.children.length < 7) {
        const td = document.createElement('td');
        td.classList.add('empty');
        row.appendChild(td);
      }
      tbody.appendChild(row);
    }

    // 네비게이션
    document.getElementById('prev').onclick = () => { month--; if(month<0){month=11;year--;} renderCalendar(); clearSchedule(); };
    document.getElementById('next').onclick = () => { month++; if(month>11){month=0;year++;} renderCalendar(); clearSchedule(); };
  }

  function selectDate(td, ymd) {
    document.querySelectorAll('.cal td.selected').forEach(el => el.classList.remove('selected'));
    td.classList.add('selected');
    const matched = events.filter(ev => ymd >= ev.date && ymd <= ev.end);
    scheduleList.innerHTML = '';
    if (matched.length) {
      matched.forEach(ev => {
        const li = document.createElement('li');
        li.innerHTML = `<span style="color:${ev.color}">●</span> <a href="${ev.link}">${ev.title}</a>`;
        scheduleList.appendChild(li);
      });
    } else {
      scheduleList.innerHTML = '<li>일정이 없습니다.</li>';
    }
  }

  function clearSchedule() { scheduleList.innerHTML = ''; }

  renderCalendar();
  // 오늘 자동 선택
  if (today.getMonth()===month && today.getFullYear()===year) {
    const td0 = document.querySelector(`.cal td[data-date="${formatYMD(today)}"]`);
    if (td0) selectDate(td0, formatYMD(today));
  }
});