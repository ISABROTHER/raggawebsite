import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { submitTestimonial } from '../lib/achievementsApi';

interface TestimonialFormProps {
  achievementId: string;
  achievementTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function TestimonialForm({ achievementId, achievementTitle, onClose, onSuccess }: TestimonialFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await submitTestimonial({
        achievement_id: achievementId,
        author_name: authorName,
        author_role: authorRole,
        content,
      });
      onSuccess();
    } catch (err) {
      setError('Failed to submit testimonial. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Share Your Experience</h2>
            <p className="text-sm text-slate-600">{achievementTitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="authorName" className="block text-sm font-bold text-slate-700 mb-2">
              Your Name *
            </label>
            <input
              id="authorName"
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="authorRole" className="block text-sm font-bold text-slate-700 mb-2">
              Your Role/Position
            </label>
            <input
              id="authorRole"
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Community Member, Teacher, etc."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-bold text-slate-700 mb-2">
              Your Testimonial *
            </label>
            <textarea
              id="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Share how this project impacted you or your community..."
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Your testimonial will be reviewed before being published.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
