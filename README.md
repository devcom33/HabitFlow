# 🎯 Habit Tracker

A modern, intuitive habit tracking application built with React that helps you build and maintain positive daily habits. Track your progress, visualize your consistency, and achieve your goals one day at a time.

![Habit Tracker Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Habit+Tracker+Demo)

## ✨ Features

- **📱 Intuitive Interface**: Clean, user-friendly design for effortless habit management
- **✅ Daily Tracking**: Mark habits as complete with a simple click
- **📊 Progress Visualization**: Track your consistency over time with visual data
- **➕ Custom Habits**: Add personalized habits that matter to you
- **💾 Persistent Storage**: Your habits and progress are saved via API integration
- **📈 Analytics**: View completion statistics and identify patterns
- **🎨 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (for habit data persistence)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API endpoint**

   Update your axios configuration in `src/api/axiosConfig.js`:

   ```javascript
   const API_BASE_URL = "http://localhost:3001"; // Your backend URL
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000` to see the app in action!

## 🏗️ Project Structure

```
src/
├── api/
│   └── axiosConfig.js          # API configuration
├── components/
│   ├── HabitList.jsx           # Main habit display component
│   ├── HabitItem.jsx           # Individual habit item
│   └── AddHabitForm.jsx        # Form for adding new habits
├── hooks/
│   └── useHabitData.js         # Custom hook for habit data management
├── services/
│   ├── getHabitsService.js     # API service for fetching habits
│   ├── addHabitService.js      # API service for adding habits
│   └── updateHabitService.js   # API service for updating habits
├── styles/
│   └── components/             # Component-specific styles
└── App.js                      # Main application component
```

## 🔧 API Integration

The app integrates with a backend API for data persistence. Expected API endpoints:

### Get Habits

```
GET /api/getHabits
Response: Array of habit objects
```

### Add Habit

```
POST /api/addHabit
Body: { name: string }
Response: Created habit object
```

### Update Habit

```
PUT /api/updateHabit/:id
Body: { completed: boolean }
Response: Updated habit object
```

## 🎨 Customization

### Adding New Features

The modular architecture makes it easy to extend functionality:

1. **New API Services**: Add new service files in `/src/services/`
2. **Custom Hooks**: Create reusable logic in `/src/hooks/`
3. **UI Components**: Build new components in `/src/components/`

### Styling

The app uses modern CSS with:

- CSS Modules for component-scoped styles
- Flexbox/Grid for layouts
- CSS custom properties for theming

## 📱 Usage

1. **View Your Habits**: See all your habits listed on the main dashboard
2. **Mark Complete**: Click the checkbox to mark a habit as completed for today
3. **Add New Habits**: Use the "Add Habit" form to create new habits
4. **Track Progress**: Monitor your completion streaks and statistics
5. **Stay Consistent**: Come back daily to maintain your habit streaks!

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push to main branch

### Deploy to Vercel

```bash
npx vercel --prod
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with a descriptive message**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📋 Roadmap

- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Habit Categories**: Organize habits by category (health, productivity, etc.)
- [ ] **Streak Tracking**: Visual streak counters and achievements
- [ ] **Data Export**: Export habit data to CSV/JSON
- [ ] **Habit Templates**: Pre-built habit suggestions
- [ ] **Notifications**: Reminder notifications for incomplete habits
- [ ] **Social Features**: Share progress with friends
- [ ] **Mobile App**: React Native version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Design inspiration from modern productivity apps
- Built with ❤️ using React and modern web technologies

## 📞 Support

Have questions or need help?

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/habit-tracker/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/habit-tracker/discussions)

---

**Happy habit building! 🌟**

_Start small, stay consistent, and watch your life transform one habit at a time._
