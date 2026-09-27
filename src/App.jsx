import React, { useState, useEffect, useContext, createContext } from 'react';
import { Routes, Route, Navigate, Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CalendarCheck, Wallet, FileText, ClipboardCheck, ChevronLeft, ChevronRight, ChevronDown, Eye, EyeOff, Search, MessageSquare, Hash, Award, MapPin, MousePointerClick, Clock, GraduationCap, Copy, Calendar, XCircle, CheckCircle2, Upload, Pencil, User, Sun, Moon, LogOut, Users, Plus, ToggleRight, AlertTriangle, Mail, CheckCheck, Book, Columns2, CalendarDays } from 'lucide-react';

const LOGO = 'https://lms.saylanimit.com/assets/logo.6lrMPvRL.png';
const PIC = 'https://hasnainmurtaza.vercel.app/images/hasnainmurtaza.jpeg';
const SNAME = 'Hasnain Murtaza';
const TPIC = 'https://media.licdn.com/dms/image/v2/D4D03AQEJIqAFm_yQFg/profile-displayphoto-scale_200_200/B4DZlUgVm0JQAc-/0/1758059389642?e=2147483647&v=beta&t=eRZZR1SfdLpx8uM9GpiUp1v69IXdbWZXQ6ZCHV3-ZcU';
const TNAME = 'Muzammil Javed';
const COURSE = 'Modern Web Application Development';
const toast = m => { const d = document.createElement('div'); d.className = 'toast'; d.textContent = m; document.body.appendChild(d); setTimeout(() => d.remove(), 2600) };
const T = createContext();
const getAuth = () => JSON.parse(localStorage.getItem('auth') || 'null');
const users = () => JSON.parse(localStorage.getItem('users') || '{"1111111111111":"12345678"}');
const Guard = ({ role, children }) => { const a = getAuth(); return a && a.role === role ? children : <Navigate to={role === 't' ? '/trainer/login' : '/login'} replace /> };

/* ---------- data ---------- */
const stat = [['Total Classes', 148], ['Present', 98], ['Leave', 0], ['Absent', 50]];
const mods = [['Web Designing', 20, 20], ['Front-End Development', 27, 31], ['Modern Front-End Development', 10, 14], ['Back-End Development', 1, 16]];
const assigns = [['test', '', 0, 'September 25, 2026', 'NOT SUBMITTED', 0], ['Student Portal', '', 0, 'September 24, 2026', 'NOT SUBMITTED', 'closed'], ['Admin panel (E commerce Dashboard)', '', 7, 'September 10, 2026', 'NOT SUBMITTED', 0], ['QUICKSERVE WMA (Batch-20)', 'HACKATHON', 0, 'August 30, 2026', 'NOT SUBMITTED', 'closed'], ['E-Commerce Website (React js)', '', 4, 'August 17, 2026', 'LATE SUBMITTED', 1], ['Furniture E-Commerce Website', '', 5, 'August 10, 2026', 'LATE SUBMITTED', 1], ['JavaScript Assignment', '', 6, 'July 10, 2026', 'SUBMITTED', 1], ['Budgetting App', '', 10, 'June 1, 2026', 'SUBMITTED', 1]];
const quizzes = [['Javascript (Quiz-4)', 'Modern Front-End Development', '1 / 3', '95%', 'PASSED'], ['Javascript (Quiz-3)', 'Modern Front-End Development', '1 / 3', '65%', 'FAILED'], ['Javascript (Quiz-2)', 'Modern Front-End Development', '1 / 3', '88%', 'PASSED'], ['Javascript (Quiz-1)', 'Modern Front-End Development', '1 / 3', '78%', 'PASSED'], ['CSS Quiz', 'Front-End Development', '3 / 3', '63%', 'FAILED'], ['HTML Quiz', 'Web Designing', '1 / 3', '68%', 'FAILED']];
const fees = ['Sep', 'Aug', 'Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb'].map((m, i) => ({ m: m + ' 2026', due: (i ? '08' : '13') + '-' + m + '-2026', v: '2026' + String(9 - i).padStart(2, '0') + '774410' }));
const first = ['Muhammad', 'Ahmed', 'Ali', 'Hassan', 'Usman', 'Bilal', 'Hamza', 'Zain', 'Harram', 'Aliyan', 'Yasir', 'Muneeb', 'Kaif', 'Salman', 'Omar', 'Talha', 'Saad', 'Imran', 'Hassan', 'Faizan'];
const last = ['Khan', 'Siddiqui', 'Ansari', 'Qureshi', 'Sheikh', 'Memon', 'Raza', 'Malik', 'Sheikh', 'Baig', 'Farooqui', 'Javed'];
const student = i => i === 0 ? { n: SNAME, r: 774410, e: 'hasnainmurtaza@gmail.com' } : { n: first[i % 20] + ' ' + last[(i * 7) % 12], r: 774410 + i * 13, e: (first[i % 20] + last[(i * 7) % 12]).toLowerCase() + (100 + i) + '@gmail.com' };
const tAssign = [['Admin panel (E commerce Dashboard)', 'Create the provided UI design in React or nextjs.', ['NextJS', 'ReactJS Introduction'], 'Sep 10, 2026'], ['QUICKSERVE WMA (Batch-20)', 'Challenge: Build a modern service-booking web application that…', [], 'Aug 30, 2026', 'HACKATHON'], ['E-Commerce Website (React js)', 'React.js frontend. Create all required e-commerce…', ['Components , Props'], 'Aug 17, 2026'], ['Furniture E-Commerce Website', 'Follow the Figma design.', ['JavaScript Book Code', 'Github'], 'Aug 10, 2026'], ['JavaScript Assignment', 'Complete all 25 JavaScript questions available at the link…', ['JavaScript Introduction'], 'Jul 10, 2026'], ['Budgetting App', 'Develop a fully responsive and functional Budgeting Web…', ['JavaScript Chapter'], 'Jun 1, 2026'], ['Amazon Clone', 'Create a fully responsive landing page inspired by the official…', ['HTML Text', 'HTML Images'], 'May 24, 2026'], ['NASA Landing Page', 'Create a fully responsive landing page inspired by NASA…', ['Media queries', 'HTML Text'], 'May 1, 2026'], ['Helplytics AI', 'SMIT GRAND CODING NIGHT - April 2026…', [], 'Apr 19, 2026', 'HACKATHON']];
const tQuiz = [['Javascript (Quiz-4)', 'Jun 24, 2026'], ['Javascript (Quiz-3)', 'Jun 3, 2026'], ['Javascript (Quiz-2)', 'May 18, 2026'], ['Javascript (Quiz-1)', 'Apr 17, 2026'], ['CSS Quiz', 'Mar 27, 2026'], ['HTML Quiz', 'Jan 7, 2026']];
const attDates = m => { const out = [], mo = { Sep: 8, Aug: 7, Jul: 6 }[m]; for (let d = 1; d <= 31; d++) { const dt = new Date(2026, mo, d); if (dt.getMonth() !== mo) break; if ([1, 3, 5].includes(dt.getDay())) out.push(dt) } return out };
const fix = ['PRESENT', 'ABSENT', 'ABSENT', 'ABSENT', 'PRESENT', 'PRESENT'];

/* ---------- small pieces ---------- */
const Bar = ({ p, c = 'var(--g)' }) => <div className="bar"><i style={{ width: p + '%', background: c }} /></div>;
const Ring = ({ p }) => <div className="ring" style={{ background: `conic-gradient(#3b82f6 ${p * 3.6}deg,var(--hi) 0)` }}><span>{p}%</span></div>;
const LB = { '#22c55e': ['#d1fae5', '#059467'], '#a855f7': ['#efe6ff', '#7c3bed'], '#3b82f6': ['#dbeafe', '#2563eb'], '#eab308': ['#fef3c7', '#d97706'], '#ef4444': ['#fee2e2', '#dc2626'], '#9a9a9a': ['#f3f4f6', '#4b5563'] };
const Stat = ({ n, l, I, c }) => <div className="st"><div><big>{n}</big>{l}</div><div className="ico" style={{ '--ib': (LB[c] || [])[0], '--ic': (LB[c] || [])[1] }}><I size={20} color={c} /></div></div>;
const Pill = ({ t }) => <span className={'pill ' + ({ PASSED: 'g', PRESENT: 'g', PAID: 'g', ACTIVE: 'g', FAILED: 'rd', ABSENT: 'rd', 'LATE SUBMITTED': 'yl', SUBMITTED: 'g', 'NOT MARKED': 'gy', ENROLLED: 'gy' }[t] || 'gy')}>{t}</span>;
function Pager({ total, page, setPage, per = 10, word = 'records' }) { const n = Math.ceil(total / per); return <div className="pager"><span>Showing {(page - 1) * per + 1}–{Math.min(page * per, total)} of {total} {word}</span><div><button disabled={page === 1} onClick={() => setPage(page - 1)}>‹ Previous</button>{[1, 2].filter(x => x <= n).map(x => <button key={x} className={page === x ? 'on' : ''} onClick={() => setPage(x)}>{x}</button>)}{n > 3 && <span>…</span>}{n > 2 && <button className={page === n ? 'on' : ''} onClick={() => setPage(n)}>{n}</button>}<button disabled={page === n} onClick={() => setPage(page + 1)}>Next ›</button></div></div> }
const Fb = () => <button className="fb" onClick={() => toast('Thanks! Feedback form coming soon.')}><MessageSquare size={16} />Feedback</button>;
const Crumb = ({ items }) => <div className="top"><div>{items.map((c, i) => <span key={i} style={{ margin: 0 }}>{i > 0 && <span> › </span>}{i === items.length - 1 ? <b>{c}</b> : c}</span>)}</div><Fb /></div>;

/* ---------- shell ---------- */
function Shell({ role, children }) {
  const s = role === 's', [sm, setSm] = useState(!s), [menu, setMenu] = useState(false), nav = useNavigate(), [theme, tog] = useContext(T);
  const items = s ? [['Dashboard', '/dashboard', LayoutDashboard], ['Progress', '/progress', BookOpen], ['Attendance', '/attendance', CalendarCheck], ['Payment', '/payment', Wallet], ['Assignment', '/assignment', FileText], ['Quiz', '/quiz', ClipboardCheck]] : [['Dashboard', '/trainer', LayoutDashboard], ['Calendar', '/trainer?tab=attendance', CalendarDays], ['Quizzes', '/trainer?tab=quizzes', ClipboardCheck]];
  const out = () => { localStorage.removeItem('auth'); nav(s ? '/login' : '/trainer/login') };
  return <div className="app"><aside className={'side' + (sm ? ' sm' : '')}>
    <div className="slogo"><img src={LOGO} alt="SMIT" /><button onClick={() => setSm(!sm)}>{sm ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button></div>
    <nav className="nav">{items.map(([l, to, I]) => <NavLink key={l} to={to} end className={({ isActive }) => isActive && (s || to === '/trainer') ? 'on' : ''}><I size={20} /><span>{l}</span></NavLink>)}</nav>
    <div className="me" onClick={() => setMenu(!menu)}>{menu && <div className="pop">
      {s && <div onClick={() => nav('/profile')}><User size={16} />Profile</div>}
      <div onClick={tog}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</div><hr /><div onClick={out}><LogOut size={16} />Log out</div></div>}
      <span>{s ? SNAME : TNAME}</span>{s ? <img src={PIC} alt={SNAME} /> : TPIC ? <img src={TPIC} alt={TNAME} /> : <b className="ini" title={TNAME}>MJ</b>}</div>
  </aside><main className="main"><div className="in-main">{children}</div></main></div>;
}

/* ---------- auth pages ---------- */
function Pass({ v, set }) { const [o, setO] = useState(false); return <div className="in"><input type={o ? 'text' : 'password'} value={v} onChange={e => set(e.target.value)} />{o ? <EyeOff onClick={() => setO(false)} /> : <Eye onClick={() => setO(true)} />}</div> }
function Login() {
  const [tab, setTab] = useState('l'), [c, setC] = useState(''), [p, setP] = useState(''), [e, setE] = useState(''), [p2, setP2] = useState(''), nav = useNavigate();
  const go = x => { x.preventDefault(); if (users()[c] === p) { localStorage.setItem('auth', JSON.stringify({ role: 's', cnic: c })); nav('/courses') } else toast('Invalid CNIC or password. Demo: 1111111111111 / 12345678') };
  const mk = x => { x.preventDefault(); if (c.length < 13 || p.length < 6 || p !== p2) return toast('Enter a 13-digit CNIC and matching passwords (min 6 characters).'); localStorage.setItem('users', JSON.stringify({ ...users(), [c]: p })); toast('Password created. Please login.'); setTab('l'); setP(''); setP2('') };
  return <div className="center"><img src={LOGO} alt="SMIT" /><h4>Student Portal</h4><div className="wrap">
    <div className="tabs"><button className={tab === 'l' ? 'on' : ''} onClick={() => setTab('l')}>Login</button><button className={tab === 'c' ? 'on' : ''} onClick={() => setTab('c')}>Create Password</button></div>
    {tab === 'l' ? <form className="box" onSubmit={go}><h3>Login</h3><p>Kindly provide the CNIC number and password used during SMIT course registration.</p><label>CNIC *</label><div className="in"><input value={c} onChange={x => setC(x.target.value)} /></div><label>Password *</label><Pass v={p} set={setP} /><button className="btn">LOGIN</button></form>
      : <form className="box" onSubmit={mk}><h3>Create Password</h3><p>Enter the CNIC used during SMIT course registration to create your password.</p><label>CNIC *</label><div className="in"><input value={c} onChange={x => setC(x.target.value)} /></div><label>Email *</label><div className="in"><input type="email" value={e} onChange={x => setE(x.target.value)} /></div><label>New Password *</label><Pass v={p} set={setP} /><label>Confirm Password *</label><Pass v={p2} set={setP2} /><button className="btn">CREATE PASSWORD</button></form>}
    <Link className="alt" to="/trainer/login">Login as teacher</Link></div></div>;
}
function TLogin() {
  const [e, setE] = useState(''), [p, setP] = useState(''), nav = useNavigate();
  const go = x => { x.preventDefault(); if (e === 'trainer@gmail.com' && p === '12345678') { localStorage.setItem('auth', JSON.stringify({ role: 't' })); nav('/trainer') } else toast('Invalid credentials. Demo: trainer@gmail.com / 12345678') };
  return <div className="center"><img src={LOGO} alt="SMIT" /><h4>Trainer Portal</h4><div className="wrap"><form className="box" onSubmit={go}><h3>Login</h3><p>Kindly provide your email and password to access the trainer portal.</p><label>Email *</label><div className="in"><input value={e} onChange={x => setE(x.target.value)} /></div><label>Password *</label><Pass v={p} set={setP} /><button className="btn">LOGIN</button><button type="button" className="link" onClick={() => toast(e ? 'Password reset link sent to ' + e : 'Enter your email first.')}>Forgot Password?</button></form><Link className="alt" to="/login">Login as student</Link></div></div>;
}

/* ---------- student pages ---------- */
function Courses() {
  const [q, setQ] = useState(''), [f, setF] = useState('ENROLLED'), nav = useNavigate();
  return <div className="main"><div className="hdr"><div className="chip" onClick={() => nav('/profile')}><img src={PIC} alt="" />{SNAME}</div><div className="srch"><input placeholder="Search Course" value={q} onChange={e => setQ(e.target.value)} /><Search /></div><select className="sel" value={f} onChange={e => setF(e.target.value)}><option>ENROLLED</option><option>ALL</option></select><Fb /></div>
    {COURSE.toLowerCase().includes(q.toLowerCase()) && <div style={{ maxWidth: 642 }}><CourseCard btn={() => nav('/dashboard')} /></div>}</div>;
}
function CourseCard({ btn, times }) {
  return <div className="card course"><div className="hd"><div><h2>{COURSE}</h2>{times && <div className="times"><span>Mon 01:00 PM - 03:00 PM</span><span>Wed 01:00 PM - 03:00 PM</span><span>Fri 01:00 PM - 03:00 PM</span></div>}</div><span className="tag">ENROLLED</span></div>
    <div className="bd"><div className="pr"><span>Progress</span><span>74% Completed</span></div><Bar p={74} /><div className="meta"><div><Hash size={16} /><b>Batch:</b>20</div><div><Award size={16} /><b>Roll:</b>774410</div><div><MapPin size={16} /><b>Campus:</b>Zaitoon Ashraf IT Park</div><div><MapPin size={16} /><b>City:</b>Karachi</div></div>
      {btn && <button className="vd" onClick={btn}><MousePointerClick size={18} />View Details</button>}</div></div>
}
function Dashboard() {
  const [tab, setTab] = useState('Quizzes'), d = new Date(), sun = new Date(d); sun.setDate(d.getDate() - d.getDay());
  const wk = [...Array(7)].map((_, i) => { const x = new Date(sun); x.setDate(sun.getDate() + i); return x });
  return <Shell role="s"><Crumb items={['Home', COURSE]} /><div className="cols"><div>
    <div className="stats" style={{ gridTemplateColumns: '1fr 1fr' }}><Stat n="98/148" l="Attendance" I={Clock} c="#22c55e" /><Stat n="12/15" l="Assignment" I={GraduationCap} c="#a855f7" /></div>
    <div className="h5">Active Course</div><CourseCard times />
    <div className="h5">Fee</div><FeeTable rows={fees.slice(0, 1)} /></div>
    <div><div className="card" style={{ padding: 20 }}><h3 style={{ margin: 0, display: 'flex', gap: 10, alignItems: 'center', fontWeight: 600 }}><Calendar size={18} />Class Schedule</h3><div className="days">{wk.map(x => <div key={x.getDate()} className={[1, 3, 5].includes(x.getDay()) ? 'a' : ''}>{x.toLocaleDateString('en', { weekday: 'short' })}<br />{x.getDate()}</div>)}</div></div>
      <div className="card" style={{ marginTop: 16, minHeight: 160 }}><div className="seg">{['Assignments', 'Quizzes', 'Events'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div><p className="empty" style={{ textAlign: 'center', color: 'var(--mut)', fontSize: 18, marginTop: 30 }}>No upcoming {tab.toLowerCase()}</p></div></div></div></Shell>;
}
function FeeTable({ rows }) { return <div className="tw"><table><thead><tr>{['Month', 'Amount', 'Type', 'Due date', 'Voucher ID', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(r => <tr key={r.v}><td>{r.m}</td><td>Rs: 1000 /-</td><td>Monthly</td><td>{r.due}</td><td>{r.v}<button className="cp" onClick={() => { navigator.clipboard?.writeText(r.v); toast('Voucher ID copied') }}><Copy size={16} /></button></td><td><Pill t="PAID" /></td></tr>)}</tbody></table></div> }
function Payment() { return <Shell role="s"><Crumb items={['Home', COURSE, 'Payment']} /><div className="info jazz"><div><p style={{ margin: '0 0 12px' }}>To pay your fee via JazzCash:</p><ol><li>Open JazzCash app</li><li>Click on <b>More</b></li><li>Go to <b>Education</b> tab</li><li>Click <b>Universities</b></li><li>Select <b>Saylani Education</b> from the list</li><li>Paste your <b>Voucher ID</b></li><li>Pay your fee</li></ol></div><div className="phone" /></div><FeeTable rows={fees} /></Shell> }
function Attendance() {
  const [m, setM] = useState('Sep'), ds = attDates(m);
  return <Shell role="s"><Crumb items={['Home', COURSE, 'Attendance']} /><div className="stats" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>{stat.map(([l, n], i) => <Stat key={l} n={n} l={l} I={[Calendar, CheckCircle2, XCircle, XCircle][i]} c={['#9a9a9a', '#22c55e', '#eab308', '#ef4444'][i]} />)}</div>
    <div className="card" style={{ padding: '22px 24px', marginBottom: 24 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><h3 style={{ margin: 0, fontWeight: 600 }}>Attendance Overview</h3><p style={{ color: 'var(--mut)', margin: '12px 0 16px' }}>Your attendance is good. Keep it up!</p></div><b style={{ color: '#0deb45', fontSize: 24 }}>94%</b></div><Bar p={94} c="#0deb45" /></div>
    <div style={{ textAlign: 'right', marginBottom: 12 }}><select className="sel" value={m} onChange={e => setM(e.target.value)}>{['Sep', 'Aug', 'Jul'].map(x => <option key={x} value={x}>{x} 2026</option>)}</select></div>
    <div className="tw"><table><thead><tr><th>Class</th><th>Date</th><th>Status</th></tr></thead><tbody>{ds.map((d, i) => <tr key={i}><td style={{ fontWeight: 400 }}>{i + 1}</td><td>{d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</td><td><Pill t={fix[i] || (i % 3 ? 'PRESENT' : 'ABSENT')} /></td></tr>)}</tbody></table></div></Shell>;
}
function Progress() {
  const [o, setO] = useState(null);
  return <Shell role="s"><Crumb items={['Home', COURSE, 'Progress']} /><div className="stats" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}><Stat n="81" l="Total Topics" I={Book} c="#22c55e" /><Stat n="58" l="Completed Topics" I={GraduationCap} c="#a855f7" /><Stat n="23" l="Pending Topics" I={Clock} c="#ef4444" /></div>
    {mods.map(([n, a, b], i) => {
      const p = Math.round(a / b * 100); return <div key={n} className="card"><div className="mod" onClick={() => setO(o === i ? null : i)}><div className="ico">{p === 100 ? <CheckCheck size={16} color="#22c55e" /> : <Clock size={16} color="#eab308" />}</div><div style={{ flex: 1 }}><h3>{n}</h3><small>Topics: {a}/{b}</small></div><Ring p={p} /><ChevronDown size={16} color="var(--mut)" style={{ transform: o === i ? 'rotate(180deg)' : '', transition: '.2s' }} /></div>
        {o === i && <div className="tp">{[...Array(b)].map((_, k) => <div key={k}><CheckCircle2 size={14} color={k < a ? '#22c55e' : 'var(--mut)'} />{n} – Topic {k + 1}</div>)}</div>}</div>
    })}</Shell>;
}
function Assignment() {
  return <Shell role="s"><Crumb items={['Home', COURSE, 'Assignment']} /><div className="stats" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}><Stat n="18" l="Assigned" I={FileText} c="#3b82f6" /><Stat n="10" l="Submitted" I={Pencil} c="#22c55e" /><Stat n="8" l="Pending" I={Clock} c="#eab308" /></div>
    <div className="tw"><table><thead><tr>{['Assignment', 'Topics', 'Due Date', 'Status', 'Action'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{assigns.map(([n, h, t, d, s, c]) => <tr key={n} className={h ? 'hack' : ''}><td>{n} {h && <span className="pill" style={{ marginLeft: 6, color: '#c084fc' }}>{h}</span>}</td><td>{t ? <span className="topic">{t} Topics</span> : <span style={{ color: 'var(--mut)', fontWeight: 400 }}>No topics</span>}</td><td style={{ color: c === 'closed' && !h ? '#ef4444' : undefined }}>{d}</td><td><span className={'pill ' + (s === 'LATE SUBMITTED' ? 'yl' : s === 'SUBMITTED' ? 'g' : 'gy')}>{s}</span></td>
      <td><span style={{ display: 'flex', gap: 16, alignItems: 'center' }}><Eye size={16} onClick={() => toast(n)} />{c === 'closed' ? <i style={{ color: '#ef4444' }}>Submissions closed</i> : <><Upload size={16} onClick={() => toast('Upload submission')} style={{ opacity: c ? .5 : 1 }} /><Pencil size={16} style={{ opacity: .5 }} /></>}</span></td></tr>)}</tbody></table></div></Shell>
}
function Quiz() {
  return <Shell role="s"><Crumb items={['Home', COURSE, 'Quiz']} /><div className="info"><h4><AlertTriangle size={18} />Important Information</h4><ul><li>Once started, quizzes must be completed in one session</li><li>Switching tabs or leaving the window will be recorded</li><li>Ensure you have a stable internet connection</li><li>The quiz will open in fullscreen mode</li></ul></div>
    <div className="tw"><table><thead><tr>{['Title', 'Module', 'Questions', 'Attempts', 'Percentage', 'Status', 'Note', 'Action'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{quizzes.map(([t, m, a, p, s]) => <tr key={t}><td style={{ fontWeight: 400 }}>{t}</td><td>{m}</td><td><span className="pill gy" style={{ border: 0 }}>40</span></td><td><span className={'pill ' + (a === '3 / 3' ? 'rd' : 'gy')} style={{ border: 0 }}>{a}</span></td><td>{p}</td><td><Pill t={s} /></td><td>—</td><td><button className="sel" disabled style={{ color: 'var(--mut)', height: 30 }}>Completed</button></td></tr>)}</tbody></table></div>
    <p style={{ textAlign: 'center', color: 'var(--mut)', marginTop: 24 }}>Contact your instructor if you have any issues accessing your quizzes.</p></Shell>
}
function Profile() {
  const nav = useNavigate(); return <Shell role="s"><Crumb items={['Home', 'Profile']} /><div className="ban"><img src={LOGO} alt="" /></div><img className="pav" src={PIC} alt={SNAME} />
    <div style={{ display: 'flex', alignItems: 'flex-end', margin: '8px 0 20px' }}><div><h2 style={{ margin: 0, fontWeight: 600 }}>{SNAME}</h2><span className="pill gy" style={{ marginTop: 6 }}>Student</span></div><button className="eb" style={{ marginLeft: 'auto' }} onClick={() => toast('Edit profile is disabled in demo')}><Pencil size={12} />Edit Profile</button></div>
    <div className="pg"><div className="card pc" style={{ alignSelf: 'start' }}><h5><Mail size={14} color="#3b82f6" />Contact Info</h5><small>Email</small><p>hasnainmurtaza@gmail.com</p><small>Phone</small><p>03XXXXXXXXX</p><small>Address</small><p>Korangi Industrial Area</p></div>
      <div><div className="card pc"><h5><User size={14} color="#3b82f6" />Personal Information</h5><div className="pg" style={{ gap: 0 }}><div><small>Gender</small><p>Male</p><small>Last Qualification</small><p>Not Provided</p></div><div><small>Date of Birth</small><p>July 17, 2008</p><small>CNIC</small><p>42XXXXXXXXXXX</p></div></div></div>
        <div className="card pc"><h5><BookOpen size={14} color="#3b82f6" />Enrolled Courses</h5><div style={{ background: 'var(--navy)', borderLeft: '3px solid #3b82f6', padding: 12, borderRadius: 4 }}><small style={{ color: 'var(--tx)', marginBottom: 6 }}>{COURSE}</small><span className="tag" style={{ fontSize: 10 }}>ENROLLED</span></div></div></div></div>
    <button className="lo" onClick={() => { localStorage.removeItem('auth'); nav('/login') }}><LogOut size={14} />Logout</button></Shell>
}

/* ---------- trainer ---------- */
function Trainer() {
  const [sp, setSp] = useSearchParams(), tab = sp.get('tab') || 'students', [pg, setPg] = useState(1), [q, setQ] = useState(''), [modal, setModal] = useState(false), [list, setList] = useState(tAssign), [nm, setNm] = useState(''), [st, setSt] = useState({});
  const tabs = [['students', 'Students', Users], ['attendance', 'Attendance', CalendarCheck], ['assignments', 'Assignments', FileText], ['quizzes', 'Quizzes', ClipboardCheck], ['progress', 'Course Progress', ClipboardCheck]];
  const go = t => { setSp({ tab: t }); setPg(1) };
  const rows = [...Array(201)].map((_, i) => student(i)).filter(s => (s.n + s.e + s.r).toLowerCase().includes(q.toLowerCase()));
  const pageOf = a => a.slice((pg - 1) * 10, pg * 10);
  const add = e => { e.preventDefault(); if (!nm) return; setList([['' + nm, 'New assignment', [], 'Oct 1, 2026'], ...list]); setModal(false); setNm(''); toast('Assignment created') };
  return <Shell role="t"><div className="top"><div>Dashboard › <b>{COURSE}</b></div><Fb /></div>
    <div className="hdr"><h2 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>{COURSE}</h2>{tab === 'students' && <div style={{ display: 'flex', gap: 8 }}><div className="srch"><input placeholder="Search by name, email or roll no..." value={q} onChange={e => { setQ(e.target.value); setPg(1) }} /><Search /></div><select className="sel"><option>All</option></select></div>}{tab === 'assignments' && <button className="btn" style={{ width: 'auto', padding: '0 16px', margin: 0, display: 'flex', gap: 6, alignItems: 'center' }} onClick={() => setModal(true)}><Plus size={14} />New Assignment</button>}</div>
    <div className="ttabs">{tabs.map(([k, l, I]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => go(k)}><I size={14} />{l}</button>)}</div>
    {tab === 'students' && <div className="tw tt"><table><thead><tr><th>Name</th><th>Roll Number</th><th>Email</th><th>Status</th><th>Action</th></tr></thead><tbody>{pageOf(rows).map(s => <tr key={s.r}><td><span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><img src={PIC} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }} />{s.n}</span></td><td>{s.r}</td><td>{s.e}</td><td><Pill t="ENROLLED" /></td><td><Eye size={14} /></td></tr>)}</tbody></table><Pager total={rows.length} page={pg} setPage={setPg} /></div>}
    {tab === 'attendance' && <><div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 12 }}>Select a Date<input className="sel" style={{ height: 32, fontSize: 12 }} defaultValue="Tue Sep 15 2026" /></div>
      {(() => {
        const A = [...Array(57)].map((_, i) => st[i] || 'NOT MARKED'), c = k => A.filter(x => x === k).length; return <><div className="stats" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}><Stat n={57} l="Total Students" I={Calendar} c="#9a9a9a" /><Stat n={c('PRESENT')} l="Present" I={CheckCircle2} c="#22c55e" /><Stat n={c('ABSENT')} l="Absent" I={XCircle} c="#ef4444" /><Stat n={c('LEAVE')} l="Leave" I={XCircle} c="#eab308" /></div>
          <div className="tw tt"><table><thead><tr><th>Roll #</th><th>Full Name</th><th>Status</th></tr></thead><tbody>{[...Array(57)].map((_, i) => i).slice((pg - 1) * 10, pg * 10).map(i => { const s = student(i); return <tr key={i}><td>{s.r}</td><td>{s.n}</td><td><select className="sel" style={{ height: 26, fontSize: 11 }} value={A[i]} onChange={e => setSt({ ...st, [i]: e.target.value })}>{['NOT MARKED', 'PRESENT', 'ABSENT', 'LEAVE'].map(x => <option key={x}>{x}</option>)}</select></td></tr> })}</tbody></table><Pager total={57} page={pg} setPage={setPg} word="students" /></div></>
      })()}</>}
    {tab === 'assignments' && <div className="tw tt"><table><thead><tr><th>Title</th><th>Description</th><th>Topics</th><th>Due Date</th><th>Actions</th></tr></thead><tbody>{pageOf(list).map((a, i) => <tr key={i} className={a[4] ? 'hack' : ''}><td>{a[0]} {a[4] && <span className="pill" style={{ fontSize: 9 }}>{a[4]}</span>}</td><td style={{ maxWidth: 260 }}>{a[1]}</td><td>{a[2].length ? a[2].map(t => <span key={t} className="mini" style={{ marginRight: 4 }}>{t}</span>) : 'No topics'}</td><td>{a[3]}</td><td><span style={{ display: 'flex', gap: 10 }}><Eye size={14} /><Pencil size={14} /></span></td></tr>)}</tbody></table><Pager total={list.length + 4} page={pg} setPage={setPg} /></div>}
    {tab === 'quizzes' && <div className="tw tt"><table><thead><tr><th>Quiz</th><th>Course(s)</th><th>Date</th><th>Expiry</th><th>Status</th><th>Action</th></tr></thead><tbody>{tQuiz.map(([q, d]) => <tr key={q}><td>{q}</td><td style={{ maxWidth: 280, color: 'var(--mut)' }}>{COURSE}, Web and Mobile App Development</td><td>{d}</td><td>{d}</td><td><Pill t="ACTIVE" /></td><td><span style={{ display: 'flex', gap: 10 }}><ToggleRight size={16} color="#22c55e" /><ClipboardCheck size={14} /><Eye size={14} /></span></td></tr>)}</tbody></table></div>}
    {tab === 'progress' && <><div className="card" style={{ padding: 16, marginBottom: 12 }}><small style={{ color: 'var(--mut)' }}>COMPARE PROGRESS</small><h4 style={{ margin: '4px 0 10px', fontWeight: 500 }}>Course Progress Overview</h4><button className="vd" style={{ margin: 0, height: 32, fontSize: 12, fontWeight: 400 }}><Columns2 size={14} />Only My Progress</button></div>
      <div className="card" style={{ padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><div><small style={{ color: 'var(--mut)' }}>MY PROGRESS</small><h4 style={{ margin: '4px 0', fontWeight: 500 }}>S Muzammil Javed - Zaitoon Ashraf IT Park <span className="mini">Batch 20</span></h4></div><span className="mini" style={{ height: 22 }}>Topics: 56/81</span></div><div className="pr" style={{ fontSize: 12, marginTop: 12 }}><span>Overall progress</span><b style={{ color: '#3b82f6' }}>69%</b></div><Bar p={69} c="#3b82f6" />
        <div style={{ marginTop: 16 }}>{mods.map(([n, a, b]) => { const p = Math.round(a / b * 100); return <div key={n} className="card mod" style={{ padding: 12 }}><div className="ico">{p === 100 ? <CheckCheck size={14} color="#22c55e" /> : <Clock size={14} color="#eab308" />}</div><div style={{ flex: 1 }}><h3 style={{ fontSize: 14 }}>{n}</h3><small>Topics: {a}/{b}</small></div><Ring p={p} /></div> })}</div></div></>}
    {modal && <div className="modal" onClick={() => setModal(false)}><form className="box" onClick={e => e.stopPropagation()} onSubmit={add}><h3 style={{ marginBottom: 16 }}>New Assignment</h3><label>Title *</label><div className="in"><input value={nm} onChange={e => setNm(e.target.value)} autoFocus /></div><button className="btn">Create</button></form></div>}</Shell>;
}

export default function App() {
  const [t, setT] = useState(localStorage.getItem('theme') || 'dark');
  useEffect(() => { document.documentElement.dataset.theme = t; localStorage.setItem('theme', t) }, [t]);
  const S = ({ c }) => <Guard role="s">{c}</Guard>;
  return <T.Provider value={[t, () => setT(t === 'dark' ? 'light' : 'dark')]}><Routes>
    <Route path="/" element={<Navigate to="/login" replace />} /><Route path="/login" element={<Login />} /><Route path="/trainer/login" element={<TLogin />} />
    <Route path="/courses" element={<S c={<Courses />} />} /><Route path="/dashboard" element={<S c={<Dashboard />} />} /><Route path="/progress" element={<S c={<Progress />} />} />
    <Route path="/attendance" element={<S c={<Attendance />} />} /><Route path="/payment" element={<S c={<Payment />} />} /><Route path="/assignment" element={<S c={<Assignment />} />} />
    <Route path="/quiz" element={<S c={<Quiz />} />} /><Route path="/profile" element={<S c={<Profile />} />} />
    <Route path="/trainer" element={<Guard role="t"><Trainer /></Guard>} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes></T.Provider>;
}
