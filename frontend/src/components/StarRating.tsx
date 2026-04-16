import { useState } from 'react';
import {
  submitRatingAPI,
  updateRatingAPI,
} from '../api/ratings.api';

export default function StarRating({
  storeId,
}: {
  storeId: string;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleRating = async (value: number) => {
    try {
      setLoading(true);
      setSaved(false);

      setRating(value);

      try {
        await submitRatingAPI({
          storeId,
          value,
        });
      } catch {
        // fallback update if already exists
        await updateRatingAPI(storeId, {
          value,
        });
      }

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      alert('Could not save rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const active =
            hover >= star || rating >= star;

          return (
            <button
              key={star}
              disabled={loading}
              type="button"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRating(star)}
              className={`text-2xl transition transform hover:scale-110 ${
                active
                  ? 'text-amber-400'
                  : 'text-slate-300'
              }`}
            >
              ★
            </button>
          );
        })}
      </div>

      <div className="mt-2 min-h-[20px]">
        {loading && (
          <p className="text-xs text-slate-500">
            Saving...
          </p>
        )}

        {saved && (
          <p className="text-xs text-green-600 font-medium">
            Rating saved ✓
          </p>
        )}

        {!loading && !saved && rating > 0 && (
          <p className="text-xs text-slate-500">
            You rated {rating}/5
          </p>
        )}
      </div>
    </div>
  );
}