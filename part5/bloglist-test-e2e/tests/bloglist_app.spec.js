const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog,getLiked } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'test',
        username: 'testuser',
        password: 'testpassword',
      },
    })
     await request.post('/api/users', {
       data: {
         name: 'test2',
         username: 'testuser2',
         password: 'testpassword2',
       },
     })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const header = page.getByText('log in to application')
    const usernameInput = page.getByTestId('username')
    const passwordInput = page.getByTestId('password')
    const loginButton = page.getByRole('button', { name: 'login' })

    await expect(header).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'testpassword')
    
      await expect(page.getByText('testuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wronguser', 'wrongpassword')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('wronguser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpassword')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')

      await expect(page.getByText('Test Blog Test Author')).toBeVisible()
    })
    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'first Blog',
          'first Author',
          'http://firstblog.com'
        )
        await createBlog(
          page,
          'second Blog',
          'second Author',
          'http://secondblog.com'
        )
        await createBlog(
          page,
          'third Blog',
          'third Author',
          'http://thirdblog.com'
        )
      })
      test('a user can like a blog', async ({ page }) => {
        const firstBlog = page.locator('.blog').filter({ hasText: 'first Blog first Author' })
        //const firstBlog = page.getByText('first Blog first Author').locator('..')
        await firstBlog.getByRole('button', { name: 'view' }).click()

        await expect(firstBlog).toContainText('0 likes')
        await getLiked(firstBlog, 1)
        await expect(firstBlog).toContainText('1 likes')
      })
      test('a user can delete a blog they created', async ({ page }) => {
        const firstBlog = page.getByText('first Blog first Author')
        await firstBlog.getByRole('button', { name: 'view' }).click()
        const firstBlogElement = firstBlog.locator('..')
        const deleteButton = firstBlogElement.getByRole('button', { name: 'remove' })

        page.once('dialog', (d) => d.accept())
        await deleteButton.click()
        await expect(firstBlog).toHaveCount(0)
      })
      test('only the user who added the blog sees the its delete button',async ({ page }) => {
        await expect(page.getByText('testuser logged in')).toBeVisible()
        const firstBlogUser1 = page.getByText('first Blog first Author')
        await firstBlogUser1.getByRole('button', { name: 'view' }).click()
        await expect(
          firstBlogUser1.locator('..').getByRole('button', {
            name: 'remove',
          })
        ).toBeVisible()
        
        const logoutButton = page.getByRole('button', { name: 'logout' })
        await logoutButton.click()
        await expect(page.getByText('testuser logged in')).not.toBeVisible()
        await loginWith(page, 'testuser2', 'testpassword2')
        await expect(page.getByText('testuser2 logged in')).toBeVisible()
        const firstBlogUser2 = page.getByText('first Blog first Author')
        await firstBlogUser2.getByRole('button', { name: 'view' }).click()
        await expect(
          firstBlogUser2.locator('..').getByRole('button', {
            name: 'remove',
          })
        ).toHaveCount(0)
      })

      test('blogs are ordered by likes', async ({ page }) => {

        const rowsAtFirst = await page.locator('.blog').all()
        const count = rowsAtFirst.length
        expect(count).toBe(3)
        await expect(rowsAtFirst[0]).toContainText('first Blog first Author')
        await expect(rowsAtFirst[1]).toContainText('second Blog second Author')
        await expect(rowsAtFirst[2]).toContainText('third Blog third Author')
        for (let i = 0; i < count; i++) {
          await rowsAtFirst[i].getByRole('button', { name: 'view' }).click()
        }
        const firstBlog = page
          .getByText('first Blog first Author')
          .locator('..')
        const secondBlog = page
          .getByText('second Blog second Author')
          .locator('..')
        const thirdBlog = page
          .getByText('third Blog third Author')
          .locator('..')

        await getLiked(secondBlog, 3)
        await getLiked(firstBlog, 2)
        await getLiked(thirdBlog, 1)

        const rowsAfterLikes = await page.locator('.blog').all()
        expect(rowsAfterLikes.length).toBe(count)
        await expect(rowsAfterLikes[0]).toContainText(
          'second Blog second Author'
        )
        await expect(rowsAfterLikes[1]).toContainText('first Blog first Author')
        await expect(rowsAfterLikes[2]).toContainText('third Blog third Author')
      })

    })
  })
    
})