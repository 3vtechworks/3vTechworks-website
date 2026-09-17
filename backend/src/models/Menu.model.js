import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema(
  {
    menuId: {
      type: String,
      required: [true, 'Menu ID is required'],
      unique: true,
      trim: true,
    },
    menuName: {
      type: String,
      required: [true, 'Menu name is required'],
      trim: true,
      maxlength: [100, 'Menu name cannot exceed 100 characters'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either admin or user',
      },
      default: 'admin',
      trim: true,
    },
    path: {
      type: String,
      trim: true,
      default: '',
    },
    icon: {
      type: String,
      trim: true,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-validate hook: auto-increment menuId starting from MENU0001 if not provided
MenuSchema.pre('validate', async function (next) {
  if (!this.menuId) {
    try {
      const menus = await mongoose.model('Menu').find(
        { menuId: /^MENU\d+$/i },
        { menuId: 1 }
      ).lean();

      let maxNum = 0;
      for (const m of menus) {
        const match = m.menuId.match(/^MENU(\d+)$/i);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) {
            maxNum = num;
          }
        }
      }
      const nextNum = maxNum + 1;
      this.menuId = `MENU${String(nextNum).padStart(4, '0')}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export const Menu = mongoose.model('Menu', MenuSchema);
