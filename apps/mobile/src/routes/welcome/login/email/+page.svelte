<script lang="ts">
  import { goto } from "$app/navigation";
  import { iconType, modalState, currentUser } from "$lib/stores/index";
  import { base_url } from "$lib/utils";
  import { pb } from "$lib/stores/pocketbase";

  let user = {
    email: "",
    password: "",
  };
  let loading = false;

  const signIn = async () => {
    loading = true;
    try {
      const authData = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(res => res.json());

      if (authData.token) {
        $currentUser = { ...user, model: authData.record };
        $modalState = {
          title: "Log in Successful",
          msg: "You have successfully logged in.",
          buttons: [
            {
              text: "Continue",
              handler: () => {
                $modalState.title = "";
                goto("/");
              },
            },
          ],
          icon: iconType.success,
        };
      } else {
        $modalState = {
          title: "Something went wrong",
          msg: "It's  our fault not yours. Please try again later.",
          buttons: [
            {
              text: "OK",
              handler: () => {
                $modalState.title = "";
              },
            },
          ],
          icon: iconType.error,
        };
      }
    } catch (error: any) {
      // let errors = Object.entries(error.data.data);
      console.log(error);

      $modalState = {
        title: error.message,
        msg: error || "Invalid credentials.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              $modalState.title = "";
            },
          },
        ],
        icon: iconType.error,
      };
    }
  };
  const resetPassword = async () => {
    if (!user.email)
      $modalState = {
        title: "Forgot Password",
        msg: "Please enter your email address and click the link again. We will send you a link to reset your password.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              $modalState.title = "";
            },
          },
        ],
        icon: iconType.info,
      };
    await pb.collection("users").requestPasswordReset(user.email);
  };
</script>

<div class="p-6">
  <div class="py-6 flex space-x-2 items-center">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button on:click={() => window.history.back()}>
      <div class="i-material-symbols-arrow-back-ios-new-rounded text-xl " />
    </button>
    <div class="text-1.25rem">Continue with E-Mail</div>
  </div>
  <form on:submit|preventDefault={signIn}>
    <!-- <form> -->
    <div class="space-y-5">
      <div>
        <label class="font-500" for="email">E-Mail</label>

        <input
          type="email"
          class="bg-transparent outline-none border w-full p-3 rounded-lg"
          placeholder="roadhero@example.com"
          bind:value={user.email}
          required
        />
      </div>

      <div>
        <label for="password" class="font-500">Password</label>

        <input
          type="password"
          class="bg-transparent outline-none border w-full p-3 rounded-lg"
          placeholder="xxxxxxx"
          bind:value={user.password}
          required
        />
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        type="submit"
        class="w-full bg-secondaryGreen text-white flex justify-center items-center p-3 rounded-lg"
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
      <div class="flex justify-between text-sm text-secondaryGreen underline">
        <a href="/welcome/login/email/new">Don't have an account</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={resetPassword}>Forgot password?</div>
      </div>
    </div>
  </form>
</div>
