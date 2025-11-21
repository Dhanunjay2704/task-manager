require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

// Extended demo data with more users and tasks
const demoUsers = [
  {
    username: 'john_doe',
    password: 'password123',
    role: 'user',
  },
  {
    username: 'jane_smith',
    password: 'password123',
    role: 'user',
  },
  {
    username: 'mike_johnson',
    password: 'password123',
    role: 'user',
  },
  {
    username: 'sarah_williams',
    password: 'password123',
    role: 'user',
  },
  {
    username: 'david_brown',
    password: 'password123',
    role: 'user',
  },
  {
    username: 'admin_user',
    password: 'admin123',
    role: 'admin',
  },
];

const demoTasks = [
  // John's tasks
  {
    title: 'Complete Project Report',
    description: 'Finish the Q4 project report and submit to management',
    status: 'in-progress',
    createdByUsername: 'john_doe',
  },
  {
    title: 'Code Review',
    description: 'Review pull requests from the team members',
    status: 'pending',
    createdByUsername: 'john_doe',
  },
  {
    title: 'Fix Login Bug',
    description: 'Debug and fix the authentication issue on mobile',
    status: 'completed',
    createdByUsername: 'john_doe',
  },
  {
    title: 'Update API Documentation',
    description: 'Update REST API documentation with new endpoints',
    status: 'pending',
    createdByUsername: 'john_doe',
  },
  {
    title: 'Database Optimization',
    description: 'Optimize slow database queries',
    status: 'in-progress',
    createdByUsername: 'john_doe',
  },
  
  // Jane's tasks
  {
    title: 'Design Homepage',
    description: 'Create wireframes and design for new homepage',
    status: 'pending',
    createdByUsername: 'jane_smith',
  },
  {
    title: 'Update Documentation',
    description: 'Update API documentation with new endpoints',
    status: 'in-progress',
    createdByUsername: 'jane_smith',
  },
  {
    title: 'Fix Mobile Responsiveness',
    description: 'Make website responsive on mobile devices',
    status: 'completed',
    createdByUsername: 'jane_smith',
  },
  {
    title: 'Create UI Components',
    description: 'Build reusable UI components library',
    status: 'pending',
    createdByUsername: 'jane_smith',
  },
  {
    title: 'Test Cross-browser Compatibility',
    description: 'Test website on different browsers',
    status: 'in-progress',
    createdByUsername: 'jane_smith',
  },
  
  // Mike's tasks
  {
    title: 'Setup Docker',
    description: 'Setup Docker containers for development',
    status: 'in-progress',
    createdByUsername: 'mike_johnson',
  },
  {
    title: 'Configure CI/CD Pipeline',
    description: 'Setup continuous integration and deployment',
    status: 'pending',
    createdByUsername: 'mike_johnson',
  },
  {
    title: 'Deploy to Production',
    description: 'Deploy the latest build to production server',
    status: 'completed',
    createdByUsername: 'mike_johnson',
  },
  {
    title: 'Monitor Server Performance',
    description: 'Check server logs and performance metrics',
    status: 'pending',
    createdByUsername: 'mike_johnson',
  },
  
  // Sarah's tasks
  {
    title: 'Write Unit Tests',
    description: 'Write unit tests for authentication module',
    status: 'in-progress',
    createdByUsername: 'sarah_williams',
  },
  {
    title: 'Integration Testing',
    description: 'Perform integration testing for payment system',
    status: 'pending',
    createdByUsername: 'sarah_williams',
  },
  {
    title: 'Security Audit',
    description: 'Perform security audit of the application',
    status: 'pending',
    createdByUsername: 'sarah_williams',
  },
  {
    title: 'Bug Fixes',
    description: 'Fix critical bugs from issue tracker',
    status: 'completed',
    createdByUsername: 'sarah_williams',
  },
  
  // David's tasks
  {
    title: 'Client Meeting Preparation',
    description: 'Prepare slides and demo for client meeting',
    status: 'pending',
    createdByUsername: 'david_brown',
  },
  {
    title: 'Requirements Analysis',
    description: 'Analyze new project requirements',
    status: 'in-progress',
    createdByUsername: 'david_brown',
  },
  {
    title: 'Sprint Planning',
    description: 'Plan tasks for next sprint',
    status: 'completed',
    createdByUsername: 'david_brown',
  },
  {
    title: 'Team Training',
    description: 'Conduct training session for new framework',
    status: 'pending',
    createdByUsername: 'david_brown',
  },
  
  // Admin's tasks
  {
    title: 'System Maintenance',
    description: 'Perform system maintenance and backups',
    status: 'completed',
    createdByUsername: 'admin_user',
  },
  {
    title: 'User Management',
    description: 'Manage user accounts and permissions',
    status: 'in-progress',
    createdByUsername: 'admin_user',
  },
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('✅ Database cleared\n');

    // Create users
    console.log('👥 Creating demo users...');
    const createdUsers = [];

    for (const userData of demoUsers) {
      const user = await User.create({
        username: userData.username,
        password: userData.password,
        role: userData.role,
      });
      createdUsers.push(user);
      const badge = user.role === 'admin' ? '🔐' : '👤';
      console.log(`  ${badge} Created: ${user.username} (${user.role})`);
    }

    console.log('\n📝 Creating demo tasks...');
    let taskCount = 0;

    for (const taskData of demoTasks) {
      const user = createdUsers.find(u => u.username === taskData.createdByUsername);
      if (user) {
        const task = await Task.create({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          createdBy: user._id,
        });
        taskCount++;
        const statusEmoji = 
          taskData.status === 'pending' ? '⏳' :
          taskData.status === 'in-progress' ? '🔄' : '✅';
        console.log(`  ${statusEmoji} "${task.title}" by ${user.username}`);
      }
    }

    console.log('\n✨ Database seeding completed successfully!\n');
    console.log('📊 Seed Summary:');
    console.log(`  • Users created: ${createdUsers.length}`);
    console.log(`  • Tasks created: ${taskCount}`);
    console.log(`  • Total data points: ${createdUsers.length + taskCount}\n`);

    console.log('📋 Demo Credentials:\n');
    
    console.log('🟦 Regular Users (Select "User" role at signup):');
    console.log('  john_doe / password123');
    console.log('  jane_smith / password123');
    console.log('  mike_johnson / password123');
    console.log('  sarah_williams / password123');
    console.log('  david_brown / password123\n');

    console.log('🟥 Admin User (Select "Admin" role at signup):');
    console.log('  admin_user / admin123\n');

    console.log('🔗 Quick Links:');
    console.log('  📝 Signup: http://localhost:5173/register');
    console.log('  🔑 User Login: http://localhost:5173/login');
    console.log('  🔐 Admin Login: http://localhost:5173/admin/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
