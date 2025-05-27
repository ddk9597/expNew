// DOM 로드 후, data-include 속성 가진 요소들에 fetch로 파일 불러와 삽입
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach((el) => {
    fetch(el.getAttribute("data-include"))
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((html) => (el.innerHTML = html))
      .catch((err) => console.error("Include error:", err));
  });
});

const newsSwiper = new Swiper(".news-swiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: true,
  // centeredSlides: true,    // ← 이 옵션을 추가
  pagination: {
    el: ".news-swiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".news-swiper .swiper-button-next",
    prevEl: ".news-swiper .swiper-button-prev",
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    600: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
});

 // DOM 로드 후, data-include 속성 가진 요소들에 fetch로 파일 불러와 삽입
 document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-include]').forEach(el => {
    fetch(el.getAttribute('data-include'))
      .then(res => res.ok ? res.text() : Promise.reject(res.status))
      .then(html => el.innerHTML = html)
      .catch(err => console.error('Include error:', err));
  });
});







const year = 2025;
    const month = 4; // May
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const calendarBody = document.getElementById("calendar-body");
    const tdMap = {};

    // 달력 생성
    let row = document.createElement("tr");
    for (let i = 0; i < firstDay; i++) row.appendChild(document.createElement("td"));

    for (let date = 1; date <= lastDate; date++) {
      const td = document.createElement("td");
      const dateStr = `${year}-${(month+1).toString().padStart(2,'0')}-${date.toString().padStart(2,'0')}`;
      td.dataset.date = dateStr;
      td.innerHTML = `<div class="date-number">${date}</div><div class="emoji-container"></div>`;
      tdMap[dateStr] = td;
      row.appendChild(td);
      if ((firstDay + date) % 7 === 0) {
        calendarBody.appendChild(row);
        row = document.createElement("tr");
      }
    }
    if (row.children.length > 0) {
      while (row.children.length < 7) row.appendChild(document.createElement("td"));
      calendarBody.appendChild(row);
    }

    // 행사 목록 불러오기 + 이모지 삽입
    const allEvents = [];
    document.querySelectorAll('.event').forEach(el => {
      const obj = {
        start: el.dataset.start,
        end: el.dataset.end,
        title: el.dataset.title,
        emoji: el.dataset.emoji,
        link: el.dataset.link
      };
      allEvents.push(obj);

      // 날짜별 이모지 삽입
      const start = new Date(obj.start);
      const end = new Date(obj.end);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().slice(0, 10);
        const td = tdMap[key];
        if (td) {
          td.querySelector('.emoji-container').innerHTML += `<span class="emoji">${obj.emoji}</span>`;
        }
      }
    });

    // 달력 클릭 시 모달 열기
    document.querySelectorAll('td').forEach(td => {
      td.addEventListener('click', () => {
        const clickedDate = td.dataset.date;
        if (!clickedDate) return;

        const modal = document.getElementById('eventModal');
        const list = document.getElementById('modalList');
        list.innerHTML = '';

        const matches = allEvents.filter(event => {
          return clickedDate >= event.start && clickedDate <= event.end;
        });

        if (matches.length > 0) {
          matches.forEach(ev => {
            const li = document.createElement('li');
            li.textContent = `${ev.emoji} ${ev.title}`;
            li.addEventListener('click', () => {
              window.location.href = ev.link;
            });
            list.appendChild(li);
          });
        } else {
          const li = document.createElement('li');
          li.textContent = '일정이 없습니다.';
          list.appendChild(li);
        }

        modal.style.display = 'flex';
      });
    });

    // 모달 닫기
    document.getElementById('eventModal').addEventListener('click', (e) => {
      if (e.target.id === 'eventModal') {
        e.currentTarget.style.display = 'none';
      }
    });

    // 모든 이벤트 불러와 emoji 표시
    document.querySelectorAll('.event').forEach(eventEl => {
      const start = new Date(eventEl.dataset.start);
      const end = new Date(eventEl.dataset.end);
      const emoji = eventEl.dataset.emoji || "⭐";


      // 클릭 시 하이라이트
      eventEl.addEventListener('click', () => {
        document.querySelectorAll('td').forEach(td => td.classList.remove('highlight'));
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().slice(0, 10);
          const td = tdMap[dateStr];
          if (td) td.classList.add('highlight');
        }
      });
    });



    
