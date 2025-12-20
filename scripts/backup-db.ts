// scripts/backup-db.ts - Database Backup Script
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function backupDatabase() {
  try {
    const projects = await prisma.project.findMany({
      include: { caseStudy: true },
    });

    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true },
    });

    const backup = {
      timestamp: new Date().toISOString(),
      projects,
      users,
    };

    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const filename = `backup-${Date.now()}.json`;
    const filepath = path.join(backupDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));

    console.log(`✅ Backup created: ${filename}`);
  } catch (error) {
    console.error('❌ Backup failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
backupDatabase();