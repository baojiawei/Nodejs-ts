#!/bin/bash
 
#====================================================================
#=== 项目路径定义 ===================================================
#=== 请在此定义您的项目路径 =========================================
#====================================================================
dir_array=(
"website-dolphinAdmin"
"website-dolphinOperationAdmin"
"website-h5chat"
)
git_project_dir=/home/bdxiaodai/t06-projectGit/bdfenqi/ 
dir_project=/home/bdxiaodai/application/
 
#===================================================================
#=== 是否开启确认 ==================================================
#=== true: 开启、false: 关闭  ======================================
#===================================================================
verify=true
 
 
#====================================================================
#=== 命令执行参数 ===================================================
#====================================================================
clear
echo -e "+------------------------------------------------------+"
echo -e "|          VUE project automation deployment           |"
echo -e "+------------------------------------------------------+"
 
echo -e "\033[33m请选择要执行的vue项目\033[0m"
for i in ${!dir_array[@]}
do
	echo -e "\033[33m$i: ${dir_array[$i]} \033[0m"
done
 
# 提示输入
read -p "请输入项目序号: " num

if [ ! -n "$num" ];then
	echo -e "\033[31mError: 未选择项目序号\033[0m"
  	exit
elif echo -e $num | grep -q '[^0-9]';then
	echo -e "\033[31mError: 请输入数字格式\033[0m"
	exit
elif [[ $num -lt 0 ]]||[[ $num -gt ${#dir_array[@]} ]];then
	echo -e "\033[31mError: 错误的项目序号\033[0m"
	exit
elif [ ! -x "${git_project_dir}${dir_array[$num]}" ]; then
        echo -e "\033[31mError: 该项目目录不存在或没有可执行权限\033[0m"
        exit
fi
 
# 项目路径输出
echo -e "\033[36mvue path: ${git_project_dir}${dir_array[$num]}\033[0m"
 
echo -e '\n'
 
# npm 命令定义
command_array=(
  "npm run uat"
  "npm install && npm run uat"
)
 
echo -e "\033[33m请选择要执行的npm命令\033[0m"
for i in ${!command_array[@]}
do
        echo -e "\033[33m$i: ${command_array[$i]} \033[0m"
done
 
 
# 提示输入
read -p "请输入命令序号: " number
 
if [ ! -n "$number" ];then
        echo -e "\033[31mError: 未选择命令序号\033[0m"
        exit
elif echo -e $number | grep -q '[^0-9]';then
        echo -e "\033[31mError: 请输入数字格式\033[0m"
        exit
elif [[ $number -lt 0 ]]||[[ $number -gt ${#command_array[@]} ]];then
        echo -e "\033[31mError: 错误的命令序号\033[0m"
        exit
fi
 
# 执行命令输出
echo -e "\033[36mvue command: ${command_array[$number]}\033[0m"
 
echo -e '\n'
 
# 输出执行命令
echo -e "\033[44;37mcommand: cd ${git_project_dir}${dir_array[$num]} && ${command_array[$number]}\033[0m"
 
# 提示输入
if  [[ $verify == true ]] ; then
	
	read -p "您是否要执行此命令(y/n): " command
	if [ "$command" != "y" ]&&[ "$command" != "n" ];then
	        echo -e "\033[31mError: 输入错误\033[0m"
	        exit
	elif [[ $command == 'n' ]];then
	        echo -e "\033[31m程序已终止... ...end\033[0m"
	        exit
	fi
 
fi
 
# 命令执行
echo -e "\033[36m同步代码>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\033[0m"
echo -e '\n'
cd ${git_project_dir}
if [ "$number" -eq "1" ];then
  echo -e "\033[31m还原当前git分支 => 切换到uat分支 => 下载代码\033[0m"
  echo -e '\n'
  git checkout .
  git clean -fd
  git checkout uat
  git pull
else
  echo -e "\033[31m切换到uat分支 => 下载代码\033[0m"
  git checkout uat
  git pull
fi

command=${command_array[$number]}
OLD_IFS="$IFS"
IFS="&&"
command_arr=($command)
IFS="$OLD_IFS"
for i in ${!command_arr[@]}
do
  cd ${git_project_dir}${dir_array[$num]} && ${command_arr[$i]} 
done

echo -e "\033[35m删除${dir_project}${dir_array[$num]}\033[0m"
echo -e '\n'
rm -rf ${dir_project}${dir_array[$num]}

echo -e "\033[35m复制${dir_array[$num]}目录到${dir_project}${dir_array[$num]}下\033[0m"
echo -e '\n'
cp -r ${git_project_dir}${dir_array[$num]}/${dir_array[$num]} ${dir_project}${dir_array[$num]}

echo -e "\033[32m${dir_array[$num]}部署完毕\033[0m"