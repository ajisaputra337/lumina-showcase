import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ categoryId: z.string().optional(), search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findMany({
        where: {
          categoryId: input.categoryId,
          name: { contains: input.search },
        },
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: { id: input.id },
        include: { category: true },
      });
    }),

  getCategories: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.category.findMany({
      orderBy: { name: "asc" },
    });
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.number().min(0),
      image: z.string(),
      categoryId: z.string(),
      sidebarSide: z.string().optional().nullable(),
      isHeroHighlight: z.boolean().optional(),
      specifications: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { categoryId, sidebarSide, isHeroHighlight, specifications, ...rest } = input;

      // Enforce single-slot exclusivity
      if (isHeroHighlight) {
        await ctx.db.product.updateMany({
          where: { isHeroHighlight: true },
          data: { isHeroHighlight: false },
        });
      }
      if (sidebarSide) {
        await ctx.db.product.updateMany({
          where: { sidebarSide },
          data: { sidebarSide: null },
        });
      }

      // For showcase purposes, if no session, we connect to the first user found or a dummy ID
      const user = await ctx.db.user.findFirst();
      return ctx.db.product.create({
        data: {
          ...rest,
          sidebarSide: sidebarSide ?? null,
          isHeroHighlight: isHeroHighlight ?? false,
          specifications: specifications ? JSON.stringify(specifications) : null,
          category: { connect: { id: categoryId } },
          createdBy: { connect: { id: ctx.session?.user?.id ?? user?.id ?? "showcase-user" } },
        },
      });
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.number().min(0),
      image: z.string(),
      categoryId: z.string(),
      sidebarSide: z.string().optional().nullable(),
      isHeroHighlight: z.boolean().optional(),
      specifications: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, categoryId, sidebarSide, isHeroHighlight, specifications, ...rest } = input;

      // Enforce single-slot exclusivity
      if (isHeroHighlight) {
        await ctx.db.product.updateMany({
          where: { isHeroHighlight: true, NOT: { id } },
          data: { isHeroHighlight: false },
        });
      }
      if (sidebarSide) {
        await ctx.db.product.updateMany({
          where: { sidebarSide, NOT: { id } },
          data: { sidebarSide: null },
        });
      }

      return ctx.db.product.update({
        where: { id },
        data: {
          ...rest,
          sidebarSide: sidebarSide ?? null,
          isHeroHighlight: isHeroHighlight ?? false,
          specifications: specifications ? JSON.stringify(specifications) : null,
          category: { connect: { id: categoryId } },
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),
});
