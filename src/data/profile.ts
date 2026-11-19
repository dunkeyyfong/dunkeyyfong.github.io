/**
 * TOÀN BỘ NỘI DUNG TRANG NẰM Ở FILE NÀY.
 * Sửa ở đây là cả trang web lẫn thẻ SEO / preview link cùng cập nhật.
 *
 * Quy ước:
 *  - Mỗi đoạn chữ song ngữ có dạng { vi: '…', en: '…' }.
 *  - Trường nào để chuỗi rỗng '' thì trang tự ẩn phần đó (không hiện chỗ trống).
 */

export type Lang = 'vi' | 'en';
export type Text = Record<Lang, string>;

/** Biểu tượng có sẵn cho các nhóm kỹ năng. */
export type SkillIcon = 'server' | 'monitor' | 'database' | 'terminal' | 'layers';

/* ───────────────────────── Thông tin chung ───────────────────────── */

export const site = {
  /**
   * Địa chỉ trang sau khi deploy (không có dấu / ở cuối).
   * Dùng cho thẻ Open Graph để link gửi qua Zalo/Facebook/LinkedIn hiện ảnh preview.
   * Nếu repo KHÔNG tên là "dunkeyyfong.github.io" thì đổi thành
   * 'https://dunkeyyfong.github.io/<tên-repo>'.
   */
  url: 'https://dunkeyyfong.github.io',
  /** Ảnh preview khi chia sẻ link (1200×630), nằm trong public/. */
  ogImage: 'og-image.png',
  /** Mô tả ngắn cho Google và preview link. */
  description: {
    vi: 'Fullstack Developer (Node.js / Vue.js / MySQL). Hơn 2 năm phát triển web app quản lý nội bộ cho khách hàng Nhật Bản.',
    en: 'Fullstack Developer (Node.js / Vue.js / MySQL). Over 2 years building internal management web apps for Japanese clients.',
  } satisfies Text,
};

export const profile = {
  name: 'Nguyễn Trọng Phong',
  title: 'Fullstack Developer · Node.js / Vue.js / MySQL',
  /** Ảnh chân dung, nằm trong public/. */
  avatar: 'avatar.jpg',

  /** Một câu giới thiệu ngay dưới tên. */
  tagline: {
    vi: 'Hơn 2 năm xây dựng web app quản lý nội bộ cho khách hàng Nhật Bản với Node.js, Vue 3 và MySQL.',
    en: 'Over 2 years building internal management web apps for Japanese clients with Node.js, Vue 3, and MySQL.',
  } satisfies Text,

  location: {
    vi: 'Từ Sơn, Bắc Ninh',
    en: 'Tu Son, Bac Ninh, Vietnam',
  } satisfies Text,

  /** Để rỗng '' thì trang ẩn mục email. */
  email: 'phongtrong865@gmail.com',
  phone: '0343 633 615',
  /** Số dùng cho link bấm-để-gọi (định dạng quốc tế). */
  phoneHref: '+84343633615',
  github: 'https://github.com/dunkeyyfong',

  about: {
    vi: 'Lập trình viên fullstack với hơn 2 năm phát triển web app quản lý nội bộ cho khách hàng Nhật Bản bằng Node.js/Express, Vue 3 và MySQL, quen làm việc trên server Linux. Có nhiều sản phẩm cá nhân tự xây dựng và vận hành từ đầu đến cuối; tự học nhanh, làm được cả độc lập lẫn theo nhóm.',
    en: 'Fullstack developer with over 2 years of experience building internal management web apps for Japanese clients with Node.js/Express, Vue 3, and MySQL, and comfortable working on Linux servers. I have built and run several personal products end to end. A fast self-learner who works well both independently and in a team.',
  } satisfies Text,

  /** Ba điểm nổi bật hiện ngay dưới phần đầu trang. */
  highlights: [
    {
      value: '2+',
      label: {
        vi: 'năm phát triển web app cho khách hàng Nhật Bản',
        en: 'years building web apps for Japanese clients',
      },
    },
    {
      value: 'Web · Mobile',
      label: {
        vi: 'Phát hành app Flutter lên App Store và Google Play',
        en: 'Shipped a Flutter app to the App Store and Google Play',
      },
    },
    {
      value: 'End-to-end',
      label: {
        vi: 'Tự xây dựng và vận hành sản phẩm cá nhân',
        en: 'Building and running my own products',
      },
    },
  ] satisfies { value: string; label: Text }[],
};

/* ───────────────────────── Kinh nghiệm ───────────────────────── */

export interface Job {
  company: string;
  role: Text;
  /** Chữ tự do, ví dụ { vi: '08/2024 – 11/2026', en: '08/2024 – 11/2026' }. */
  period: Text;
  bullets: Text[];
  tech: string[];
  /** Ghi chú nhỏ dưới cùng (tùy chọn). */
  note?: Text;
}

export const experience: Job[] = [
  {
    company: 'UNI-SAX CO., LTD.',
    role: { vi: 'Fullstack Developer (Web & Mobile)', en: 'Fullstack Developer (Web & Mobile)' },
    period: { vi: '08/2024 – 11/2026', en: '08/2024 – 11/2026' },
    bullets: [
      {
        vi: 'Phát triển web app quản lý nội bộ cho khách hàng Nhật Bản: frontend Vue 3 + TypeScript, backend Node.js/Express + tRPC, Prisma ORM kết nối MySQL.',
        en: 'Developed an internal management web app for a Japanese client: Vue 3 + TypeScript frontend, Node.js/Express + tRPC backend, Prisma ORM on MySQL.',
      },
      {
        vi: 'Phụ trách phần lớn phân hệ quản lý dự án: nhân sự và đối tác tham gia, đơn giá, doanh thu theo tháng.',
        en: 'Owned most of the project management module: staff and partner assignments, unit rates, and monthly revenue.',
      },
      {
        vi: 'Xây dựng các module khách hàng, báo giá, đơn hàng, hóa đơn (xuất PDF, Excel, CSV) và báo cáo doanh thu, lợi nhuận theo tháng, nhân viên, khách hàng.',
        en: 'Built the customer, quotation, order, and invoice modules (PDF, Excel, and CSV export) plus revenue and profit reports by month, employee, and client.',
      },
      {
        vi: 'Viết tác vụ định kỳ: tạo dự án kỳ mới, email nhắc dự án sắp kết thúc, tính điểm thành tích tháng.',
        en: 'Wrote scheduled jobs: creating projects for each new period, reminder emails for projects nearing their end, and monthly performance scoring.',
      },
      {
        vi: 'Làm việc với server Linux trên AWS EC2 (Docker, Nginx): script sao lưu MySQL tự động lên S3, giám sát và cảnh báo qua CloudWatch.',
        en: 'Worked on Linux servers on AWS EC2 (Docker, Nginx): automated MySQL backups to S3, and monitoring and alerting with CloudWatch.',
      },
      {
        vi: 'Phát triển app Flutter iOS/Android (Zoom Video SDK, Twilio Voice, Firebase), phát hành lên App Store và Google Play.',
        en: 'Developed a Flutter app for iOS/Android (Zoom Video SDK, Twilio Voice, Firebase) and released it on the App Store and Google Play.',
      },
    ],
    tech: [
      'Vue 3',
      'TypeScript',
      'Node.js',
      'Express',
      'tRPC',
      'Prisma',
      'MySQL',
      'AWS',
      'Docker',
      'Nginx',
      'Flutter',
      'Firebase',
    ],
    note: {
      vi: 'Hệ thống nội bộ của khách hàng nên không công khai hình ảnh và đường dẫn.',
      en: 'Internal client system, so screenshots and links are not public.',
    },
  },
];

/* ───────────────────────── Dự án cá nhân ───────────────────────── */

export interface Project {
  /**
   * Tên file ảnh: đặt ảnh chụp màn hình vào public/projects/<slug>.png là card tự hiện ảnh.
   * Chưa có ảnh thì card hiện khối màu kèm tên dự án.
   */
  slug: string;
  name: string;
  /** Dòng phụ nhỏ trên ảnh bìa. */
  kind: Text;
  /** Link demo/GitHub. Để rỗng '' nếu chưa có. */
  url: string;
  description: Text;
  tech: string[];
}

export const projects: Project[] = [
  {
    slug: 'ai-interview-coach',
    name: 'AI Interview Coach',
    kind: { vi: 'SaaS luyện phỏng vấn', en: 'Interview practice SaaS' },
    url: 'https://ai-coach.hirogohanoi.com',
    description: {
      vi: 'SaaS luyện phỏng vấn cho thị trường Nhật Bản: trả lời bằng chữ hoặc giọng nói, gói dùng thử, email thông báo 3 ngôn ngữ. Tự xây dựng và vận hành toàn bộ.',
      en: 'Interview practice SaaS for the Japanese job market: answer by text or voice, a free trial plan, and notification emails in 3 languages. Built and operated entirely by me.',
    },
    tech: ['TypeScript', 'Cloudflare Workers', 'D1 (SQLite)', 'Gemini API'],
  },
  {
    slug: 'educlass',
    name: 'EduClass',
    kind: { vi: 'Hệ thống quản lý lớp học', en: 'Class management system' },
    url: '',
    description: {
      vi: 'Web quản lý lớp học: xếp lớp, lịch dạy, điểm danh, giao và chấm bài, thi trực tuyến, nhập học viên từ Excel.',
      en: 'Class management web app: class assignment, teaching schedules, attendance, assigning and grading homework, online exams, and student import from Excel.',
    },
    tech: ['React 19', 'TypeScript', 'Hono', 'Tailwind CSS', 'Recharts'],
  },
];

/* ───────────────────────── Kỹ năng ───────────────────────── */

export const skills: { group: Text; icon: SkillIcon; items: string[] }[] = [
  {
    group: { vi: 'Backend', en: 'Backend' },
    icon: 'server',
    items: ['Node.js', 'Express.js', 'tRPC', 'Hono', 'REST API', 'Socket.io'],
  },
  {
    group: { vi: 'Frontend', en: 'Frontend' },
    icon: 'monitor',
    items: ['Vue 3', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    group: { vi: 'Cơ sở dữ liệu', en: 'Databases' },
    icon: 'database',
    items: ['MySQL 8', 'SQLite / Cloudflare D1', 'Prisma ORM', 'SQL query optimization'],
  },
  {
    group: { vi: 'Linux & hạ tầng', en: 'Linux & infrastructure' },
    icon: 'terminal',
    items: ['Linux', 'Bash / Shell', 'Python', 'Docker', 'Nginx', 'cron', 'AWS (EC2, RDS, S3, CloudWatch)', 'Cloudflare'],
  },
  {
    group: { vi: 'Khác', en: 'Other' },
    icon: 'layers',
    items: ['Git', 'GitHub', 'Flutter (iOS/Android)', 'Firebase'],
  },
];

/* ───────────────────────── Học vấn ───────────────────────── */

export const education: { school: Text; degree: Text; status: Text; note?: Text }[] = [
  {
    school: { vi: 'BTEC FPT (Pearson, UK)', en: 'BTEC FPT (Pearson, UK)' },
    degree: { vi: 'BTEC HND – Software Engineering', en: 'BTEC HND – Software Engineering' },
    status: { vi: 'Tốt nghiệp 2025', en: 'Graduated 2025' },
  },
];

/* ───────────────────────── Ngoại ngữ ───────────────────────── */

export const languages: { name: Text; level: Text }[] = [
  {
    name: { vi: 'Tiếng Anh', en: 'English' },
    level: { vi: 'Đọc hiểu tài liệu kỹ thuật', en: 'Reading technical documentation' },
  },
];

/* ───────────────────────── Chữ trên giao diện ───────────────────────── */
/* Nhãn nút, tiêu đề mục… Thường không cần sửa. */

export const ui = {
  skipToContent: { vi: 'Bỏ qua, tới nội dung chính', en: 'Skip to main content' },
  switchLanguage: { vi: 'Ngôn ngữ', en: 'Language' },
  mainNav: { vi: 'Các mục trong trang', en: 'Page sections' },
  portraitAlt: { vi: 'Ảnh chân dung', en: 'Portrait of' },
  highlights: { vi: 'Điểm nổi bật', en: 'Highlights' },

  sections: {
    about: { vi: 'Giới thiệu', en: 'About' },
    experience: { vi: 'Kinh nghiệm', en: 'Experience' },
    projects: { vi: 'Dự án', en: 'Projects' },
    skills: { vi: 'Kỹ năng', en: 'Skills' },
    education: { vi: 'Học vấn', en: 'Education' },
    languages: { vi: 'Ngoại ngữ', en: 'Languages' },
    contact: { vi: 'Liên hệ', en: 'Contact' },
  },

  contactMe: { vi: 'Liên hệ', en: 'Get in touch' },
  seeProjects: { vi: 'Xem dự án', en: 'View projects' },
  contactLead: {
    vi: 'Liên hệ với tôi qua email, điện thoại hoặc GitHub.',
    en: 'Reach me by email, phone, or GitHub.',
  },
  techUsed: { vi: 'Công nghệ', en: 'Tech' },
  opensInNewTab: { vi: '(mở tab mới)', en: '(opens in a new tab)' },

  email: { vi: 'Email', en: 'Email' },
  phone: { vi: 'Điện thoại', en: 'Phone' },
  location: { vi: 'Khu vực', en: 'Location' },
  copyEmail: { vi: 'Sao chép', en: 'Copy' },
  copyEmailLabel: { vi: 'Sao chép địa chỉ email', en: 'Copy email address' },
  copied: { vi: 'Đã sao chép', en: 'Copied' },
} satisfies Record<string, Text | Record<string, Text>>;
