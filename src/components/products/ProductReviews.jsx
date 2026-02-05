import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Star, ThumbsUp, User } from 'lucide-react';
import { productAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const ProductReviews = ({ productId, reviews, onReviewSubmit }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const userReview = reviews.find((review) => review.reviewer?.id === user?.id);
  const hasReviewed = !!userReview;

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    try {
      await productAPI.postReview(productId, { rating, comment });
      toast.success(hasReviewed ? 'Review updated successfully' : 'Review submitted successfully');
      setShowReviewForm(false);
      setRating(0);
      setComment('');
      onReviewSubmit();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm('Are you sure you want to delete your review?')) {
      return;
    }

    try {
      await productAPI.deleteReview(productId);
      toast.success('Review deleted successfully');
      onReviewSubmit();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditReview = () => {
    setRating(userReview.rating);
    setComment(userReview.comment);
    setShowReviewForm(true);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[Math.floor(review.rating)]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Overall Rating */}
        <div className="flex-shrink-0 text-center">
          <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 ${
                  index < Math.floor(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Based on {reviews.length} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDistribution[star];
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 w-12">
                  {star} star
                </span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write Review Button */}
      {isAuthenticated && (
        <div>
          {!hasReviewed && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Write a Review
            </button>
          )}

          {hasReviewed && !showReviewForm && (
            <div className="flex gap-3">
              <button
                onClick={handleEditReview}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Edit Your Review
              </button>
              <button
                onClick={handleDeleteReview}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Delete Review
              </button>
            </div>
          )}
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {hasReviewed ? 'Edit Your Review' : 'Write a Review'}
          </h3>

          {/* Star Rating Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {rating} out of 5
                </span>
              )}
            </div>
          </div>

          {/* Comment Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Review *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder="Share your experience with this product..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : hasReviewed ? 'Update Review' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowReviewForm(false);
                setRating(0);
                setComment('');
              }}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h3>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.review_id}
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
            >
              <div className="flex items-start gap-4">
                {/* Reviewer Avatar */}
                <div className="flex-shrink-0">
                  {review.reviewer?.avatar?.url ? (
                    <img
                      src={review.reviewer.avatar.url}
                      alt={review.reviewer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.reviewer?.name || 'Anonymous'}
                      </h4>
                      {review.created_at && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(review.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {review.rating.toFixed(1)}
                    </span>
                    {review.reviewer?.id === user?.id && (
                      <span className="ml-2 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                        Your Review
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!isAuthenticated && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Please sign in to write a review
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;