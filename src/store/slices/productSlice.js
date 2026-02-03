import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../utils/api';
import toast from 'react-hot-toast';

// ── async thunks 
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params, { rejectWithValue }) => {
    try { return await productAPI.getAll(params); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async ({ keyword, page }, { rejectWithValue }) => {
    try { return await productAPI.search(keyword, page); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try { return await productAPI.getById(id); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async ({ category, page }, { rejectWithValue }) => {
    try { return await productAPI.getByCategory(category, page); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try { return await productAPI.getCategories(); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const fetchFeatured = createAsyncThunk(
  'products/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try { return await productAPI.getFeatured(); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  'products/fetchNewArrivals',
  async (_, { rejectWithValue }) => {
    try { return await productAPI.getNewArrivals(); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  'products/fetchRelated',
  async (id, { rejectWithValue }) => {
    try { return await productAPI.getRelated(id); }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const postReview = createAsyncThunk(
  'products/postReview',
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const data = await productAPI.postReview(productId, { rating, comment });
      toast.success('Review posted!');
      return data;
    }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

export const deleteReview = createAsyncThunk(
  'products/deleteReview',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await productAPI.deleteReview(productId);
      toast.success('Review deleted.');
      return data;
    }
    catch (e) { toast.error(e.message); return rejectWithValue(e.message); }
  }
);

// ── slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    // listing
    products: [],
    totalProducts: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,

    // single
    singleProduct: null,
    singleLoading: false,

    // related
    relatedProducts: [],

    // categories
    categories: [],

    // featured / new arrivals
    featuredProducts: [],
    newArrivals: [],

    error: null,
  },
  reducers: {
    clearSingleProduct: (state) => { state.singleProduct = null; },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.products = a.payload.products;
        s.totalProducts = a.payload.totalProducts;
        s.currentPage = a.payload.currentPage;
        s.totalPages = a.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // searchProducts
      .addCase(searchProducts.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(searchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.products = a.payload.products;
        s.totalProducts = a.payload.totalProducts;
        s.currentPage = a.payload.currentPage;
        s.totalPages = a.payload.totalPages;
      })
      .addCase(searchProducts.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // fetchByCategory
      .addCase(fetchProductsByCategory.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProductsByCategory.fulfilled, (s, a) => {
        s.loading = false;
        s.products = a.payload.products;
        s.totalProducts = a.payload.totalProducts;
        s.currentPage = a.payload.currentPage;
        s.totalPages = a.payload.totalPages;
      })
      .addCase(fetchProductsByCategory.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // fetchById
      .addCase(fetchProductById.pending,   (s) => { s.singleLoading = true; s.error = null; })
      .addCase(fetchProductById.fulfilled, (s, a) => {
        s.singleLoading = false;
        s.singleProduct = a.payload.product;
      })
      .addCase(fetchProductById.rejected, (s, a) => { s.singleLoading = false; s.error = a.payload; })

      // related
      .addCase(fetchRelatedProducts.fulfilled, (s, a) => { s.relatedProducts = a.payload.relatedProducts; })

      // categories
      .addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload.categories; })

      // featured
      .addCase(fetchFeatured.fulfilled, (s, a) => { s.featuredProducts = a.payload.featuredProducts; })

      // new arrivals
      .addCase(fetchNewArrivals.fulfilled, (s, a) => { s.newArrivals = a.payload.newArrivals; })

      // postReview – update singleProduct reviews inline
      .addCase(postReview.fulfilled, (s, a) => {
        if (s.singleProduct && a.payload.review) {
          const existing = s.singleProduct.reviews?.findIndex(
            (r) => r.reviewer?.id === a.payload.review.user_id
          );
          if (existing >= 0) {
            s.singleProduct.reviews[existing] = {
              ...s.singleProduct.reviews[existing],
              rating: a.payload.review.rating,
              comment: a.payload.review.comment,
            };
          } else {
            s.singleProduct.reviews = s.singleProduct.reviews || [];
            s.singleProduct.reviews.push({
              review_id: a.payload.review.id,
              rating: a.payload.review.rating,
              comment: a.payload.review.comment,
              reviewer: { id: a.payload.review.user_id, name: 'You', avatar: null },
            });
          }
          if (a.payload.product) s.singleProduct.ratings = a.payload.product.ratings;
        }
      })

      // deleteReview – remove from singleProduct reviews
      .addCase(deleteReview.fulfilled, (s, a) => {
        if (s.singleProduct && a.payload.review) {
          s.singleProduct.reviews = (s.singleProduct.reviews || []).filter(
            (r) => r.review_id !== a.payload.review.id
          );
          if (a.payload.product) s.singleProduct.ratings = a.payload.product.ratings;
        }
      });
  },
});

export const { clearSingleProduct } = productSlice.actions;
export default productSlice.reducer;