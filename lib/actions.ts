'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

/* ----------------------------------
   Auth Guard
----------------------------------- */
async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

/* ----------------------------------
   Project Actions
----------------------------------- */

export async function createProject(
  data: Prisma.ProjectCreateInput
) {
  await requireAdmin();

  const project = await prisma.project.create({
    data: {
      ...data,
      slug:
        data.slug ??
        data.title.toLowerCase().trim().replace(/\s+/g, '-'),
    },
  });

  revalidatePath('/projects');
  revalidatePath('/case-studies');
  revalidatePath('/admin/projects');

  return project;
}

export async function updateProject(
  id: string,
  data: Prisma.ProjectUpdateInput
) {
  await requireAdmin();

  const project = await prisma.project.update({
    where: { id },
    data,
  });

  revalidatePath('/projects');
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath(`/case-studies/${project.slug}`);
  revalidatePath('/admin/projects');

  return project;
}

export async function deleteProject(id: string) {
  await requireAdmin();

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath('/projects');
  revalidatePath('/case-studies');
  revalidatePath('/admin/projects');
}

/* ----------------------------------
   Read Queries
----------------------------------- */

export async function getProjects(publishedOnly = false) {
  return prisma.project.findMany({
    where: publishedOnly ? { isPublished: true } : undefined,
    include: { caseStudy: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { caseStudy: true },
  });
}

export async function getCaseStudies() {
  return prisma.project.findMany({
    where: {
      isPublished: true,
      caseStudy: { isNot: null },
    },
    include: { caseStudy: true },
    orderBy: { createdAt: 'desc' },
  });
}

/* ----------------------------------
   Case Study Actions
----------------------------------- */

/**
 * Create a case study using checked relation input
 * @param data Pass `project: { connect: { id } }` to link to a project
 */
export async function createCaseStudy(
  data: Omit<Prisma.CaseStudyCreateInput, 'project'> & { projectId: string }
) {
  await requireAdmin();

  const caseStudy = await prisma.caseStudy.create({
    data: {
      overview: data.overview,
      problem: data.problem,
      solution: data.solution,
      challenges: data.challenges,
      architecture: data.architecture ?? null,
      screenshots: data.screenshots,
      project: {
        connect: { id: data.projectId },
      },
    },
  });

  revalidatePath('/case-studies');
  revalidatePath('/admin/projects');

  return caseStudy;
}

export async function updateCaseStudy(
  id: string,
  data: Prisma.CaseStudyUpdateInput
) {
  await requireAdmin();

  const caseStudy = await prisma.caseStudy.update({
    where: { id },
    data,
  });

  revalidatePath('/case-studies');
  revalidatePath('/admin/projects');

  return caseStudy;
}

export async function deleteCaseStudy(id: string) {
  await requireAdmin();

  await prisma.caseStudy.delete({ where: { id } });

  revalidatePath('/case-studies');
  revalidatePath('/admin/projects');
}

export async function updateCV(cvUrl: string, fileName: string) {
  await checkAuth();
  
  // Get or create settings
  let settings = await prisma.settings.findFirst();
  
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        cvUrl,
        cvFileName: fileName,
      },
    });
  } else {
    settings = await prisma.settings.update({
      where: { id: settings.id },
      data: {
        cvUrl,
        cvFileName: fileName,
      },
    });
  }
  
  revalidatePath('/');
  revalidatePath('/contact');
  return settings;
}

export async function getCV() {
  const settings = await prisma.settings.findFirst();
  return settings;
}

export async function deleteCV() {
  await checkAuth();
  
  const settings = await prisma.settings.findFirst();
  if (settings) {
    await prisma.settings.update({
      where: { id: settings.id },
      data: {
        cvUrl: null,
        cvFileName: null,
      },
    });
  }
  
  revalidatePath('/');
  revalidatePath('/contact');
}
function checkAuth() {
  throw new Error('Function not implemented.');
}

