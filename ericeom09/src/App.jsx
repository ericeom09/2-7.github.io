import React, { useState } from 'react';
import './App.css';

function App() {
  const names = [
    "강건", "강류헌", "강세훈", "강우빈", "구동하", "김건희", "김민혁", "김은성", "김준희", "김태율", 
    "김태호", "김현", "김현식", "문강윤", "박민규", "박시우", "박주은", "박준성", "박지윤", "배준휘", 
    "안동준", "엄현식", "유이준", "윤서준", "이경민", "이남주", "이종승", "이현서", "임강현", "임성주", "장재민", 
    "장해찬", "조성재", "조현빈", "황성연"
  ];

  const initialStudents = names.map((name, i) => ({
    id: i + 1,
    name: name,
    s2: false,
    s3: false,
    reason: ""
  }));

  const [students, setStudents] = useState(initialStudents);
  const commonReasons = ["학원", "병원", "동아리", "프젝실" , "멀티실"];

  const toggle = (id, session) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        const nextStatus = !s[session];
        
        const otherSession = session === 's2' ? 's3' : 's2';
        const reasonReset = (!nextStatus && !s[otherSession]) ? "" : s.reason;
        return { ...s, [session]: nextStatus, reason: reasonReset };
      }
      return s;
    }));
  };

  const setReason = (id, text) => {
    setStudents(students.map(s => s.id === id ? { ...s, reason: text } : s));
  };

  return (
    <div className="app-viewport">
      <header className="main-header">
        <div className="brand">
          <span className="icon">🌙</span>
          <h1>2-7 야자 관리 시스템</h1>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card blue">
            <span className="label">2차 불참</span>
            <span className="value">{students.filter(s=>s.s2).length}</span>
          </div>
          <div className="stat-card red">
            <span className="label">3차 불참</span>
            <span className="value">{students.filter(s=>s.s3).length}</span>
          </div>
          <button className="reset-trigger" onClick={() => window.confirm("전체 데이터를 초기화할까요?") && setStudents(initialStudents)}>
            초기화
          </button>
        </div>
      </header>

      <main className="student-grid-container">
        {students.map(s => (
          <div key={s.id} className={`student-tile ${s.s2 || s.s3 ? 'is-absent' : ''}`}>
            <div className="tile-header">
              <span className="tile-id">{s.id}</span>
              <span className="tile-name">{s.name}</span>
            </div>
            
            <div className="session-switch-group">
              <button className={`switch-btn ${s.s2 ? 'on-2' : ''}`} onClick={() => toggle(s.id, 's2')}>2차</button>
              <button className={`switch-btn ${s.s3 ? 'on-3' : ''}`} onClick={() => toggle(s.id, 's3')}>3차</button>
            </div>

            <div className="reason-container">
              {(s.s2 || s.s3) && !s.reason && (
                <div className="reason-pop-grid">
                  {commonReasons.map(r => (
                    <button key={r} className="reason-pill" onClick={() => setReason(s.id, r)}>{r}</button>
                  ))}
                </div>
              )}
              {s.reason && (
                <div className="reason-confirmed" onClick={() => setReason(s.id, "")}>
                  <span className="reason-text">{s.reason}</span>
                  <span className="edit-dot">●</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;