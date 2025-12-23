// components/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject, updateProject, createCaseStudy, updateCaseStudy } from '@/lib/actions';
import { X } from 'lucide-react';
import ScreenshotPreview from './ScreenshotPreview';

interface ProjectFormProps {
  project?: any;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Project fields
  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [shortDesc, setShortDesc] = useState(project?.shortDesc || '');
  const [fullDesc, setFullDesc] = useState(project?.fullDesc || '');
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || []);
  const [techInput, setTechInput] = useState('');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl || '');
  const [coverImage, setCoverImage] = useState(project?.coverImage || '');
  const [isFeatured, setIsFeatured] = useState(project?.isFeatured || false);
  const [isPublished, setIsPublished] = useState(project?.isPublished ?? true);

  // Case study fields
  const [hasCaseStudy, setHasCaseStudy] = useState(!!project?.caseStudy);
  const [overview, setOverview] = useState(project?.caseStudy?.overview || '');
  const [problem, setProblem] = useState(project?.caseStudy?.problem || '');
  const [solution, setSolution] = useState(project?.caseStudy?.solution || '');
  const [challenges, setChallenges] = useState(project?.caseStudy?.challenges || '');
  const [architecture, setArchitecture] = useState(project?.caseStudy?.architecture || '');
  const [screenshots, setScreenshots] = useState<string[]>(project?.caseStudy?.screenshots || []);
  const [screenshotInput, setScreenshotInput] = useState('');

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const addScreenshot = () => {
    if (screenshotInput.trim() && !screenshots.includes(screenshotInput.trim())) {
      setScreenshots([...screenshots, screenshotInput.trim()]);
      setScreenshotInput('');
    }
  };

  const removeScreenshot = (url: string) => {
    setScreenshots(screenshots.filter(s => s !== url));
  };

  const generateSlug = () => {
    const generated = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setSlug(generated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const projectData = {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        shortDesc,
        fullDesc,
        techStack,
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
        coverImage: coverImage || null,
        isFeatured,
        isPublished,
      };

      let savedProject;
      if (project) {
        savedProject = await updateProject(project.id, projectData);
      } else {
        savedProject = await createProject(projectData);
      }

      // Handle case study
      if (hasCaseStudy) {
        const caseStudyData = {
          projectId: savedProject.id,
          overview,
          problem,
          solution,
          challenges,
          architecture: architecture || null,
          screenshots,
        };

        if (project?.caseStudy) {
          await updateCaseStudy(project.caseStudy.id, caseStudyData);
        } else {
          await createCaseStudy(caseStudyData);
        }
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded text-red-400">
          {error}
        </div>
      )}

      {/* Project Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slug *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Short Description *
          </label>
          <textarea
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Description *
          </label>
          <textarea
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tech Stack
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
              placeholder="e.g., React, TypeScript"
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addTech}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm"
              >
                {tech}
                <button type="button" onClick={() => removeTech(tech)}>
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Demo URL
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-6 mt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Featured Project</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Published</span>
          </label>
        </div>
      </div>

      {/* Case Study */}
      <div className="border-t border-gray-700 pt-8">
        <label className="flex items-center gap-2 cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={hasCaseStudy}
            onChange={(e) => setHasCaseStudy(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500"
          />
          <span className="text-xl font-bold text-white">Add Case Study</span>
        </label>

        {hasCaseStudy && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Overview *
              </label>
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required={hasCaseStudy}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Problem Statement *
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required={hasCaseStudy}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Solution *
              </label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required={hasCaseStudy}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Architecture (Optional)
              </label>
              <textarea
                value={architecture}
                onChange={(e) => setArchitecture(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Challenges & Learnings *
              </label>
              <textarea
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required={hasCaseStudy}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Screenshots
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="url"
                  value={screenshotInput}
                  onChange={(e) => setScreenshotInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addScreenshot())}
                  placeholder="Image URL"
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addScreenshot}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {screenshots.map((url, i) => (
                  <ScreenshotPreview 
                    key={i} 
                    url={url} 
                    onRemove={() => removeScreenshot(url)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}